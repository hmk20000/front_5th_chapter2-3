import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../api/addComment';
import { FetchCommentsResponse } from '../api/types';
import { Comment } from '../model/types';

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addComment,
    onMutate: async (newComment) => {
      // 기존 쿼리 취소
      await queryClient.cancelQueries({
        queryKey: ['comments', newComment.postId],
      });

      // 이전 데이터 저장
      const previousComments = queryClient.getQueryData<FetchCommentsResponse>([
        'comments',
        newComment.postId,
      ]);

      // 낙관적 업데이트
      queryClient.setQueryData<FetchCommentsResponse>(
        ['comments', newComment.postId],
        (old) => {
          if (!old) return { comments: [], total: 0, skip: 0, limit: 0 };

          // 임시 Comment 객체 생성
          const optimisticComment: Comment = {
            id: `temp-${Date.now()}`, // 임시 ID
            body: newComment.body || '',
            postId: newComment.postId || '',
            likes: 0,
            user: {
              id: newComment.userId,
              username: 'You',
              fullName: 'You',
            },
          };

          return {
            ...old,
            comments: [...old.comments, optimisticComment],
            total: old.total + 1,
          };
        },
      );

      return { previousComments };
    },
    onError: (_, newComment, context) => {
      // 에러 발생 시 이전 상태로 롤백
      queryClient.setQueryData(
        ['comments', newComment.postId],
        context?.previousComments,
      );
    },
    // Mock API 특성상 무효화 하지 않음. => 실 데이터가 변경되지 않기때문에 리셋됨.
    // onSettled: (_, __, newComment) => {
    //   // 서버 데이터와 동기화
    //   queryClient.invalidateQueries({
    //     queryKey: ['comments', newComment.postId],
    //   });
    // },
  });
};
