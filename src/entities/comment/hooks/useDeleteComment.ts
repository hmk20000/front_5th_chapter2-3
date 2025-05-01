import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../api/deleteComment';
import { FetchCommentsResponse } from '../api/types';
import { Comment } from '../model/types';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onMutate: async (comment: Comment) => {
      // 기존 쿼리 취소
      await queryClient.cancelQueries({
        queryKey: ['comments', comment.postId],
      });

      // 이전 데이터 저장
      const previousComments = queryClient.getQueryData<FetchCommentsResponse>([
        'comments',
        comment.postId,
      ]);

      // 낙관적 업데이트
      queryClient.setQueryData<FetchCommentsResponse>(
        ['comments', comment.postId],
        (old) => {
          if (!old) return { comments: [], total: 0, skip: 0, limit: 0 };

          return {
            ...old,
            comments: old.comments.filter((c) => c.id !== comment.id),
            total: Math.max(0, old.total - 1),
          };
        },
      );

      return { previousComments };
    },
    onError: (_, comment, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (comment.postId) {
        queryClient.setQueryData(
          ['comments', comment.postId],
          context?.previousComments,
        );
      }
    },
    // Mock API 특성상 무효화 하지 않음. => 실 데이터가 변경되지 않기때문에 리셋됨.
    // onSettled: (_, __, comment) => {
    //   if (comment.postId) {
    //     // 서버 데이터와 동기화
    //     queryClient.invalidateQueries({
    //       queryKey: ['comments', comment.postId],
    //     });
    //   }
    // },
  });
};
