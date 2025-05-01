import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateComment } from '../api/updateCommen';
import { FetchCommentsResponse } from '../api/types';

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateComment,
    onMutate: async (comment) => {
      await queryClient.cancelQueries({
        queryKey: ['comments', comment.postId],
      });
      const previousComments = queryClient.getQueryData<FetchCommentsResponse>([
        'comments',
        comment.postId,
      ]);

      queryClient.setQueryData<FetchCommentsResponse>(
        ['comments', comment.postId],
        (old) => {
          if (!old) return { comments: [], total: 0, skip: 0, limit: 0 };
          return {
            ...old,
            comments: old.comments.map((c) =>
              c.id === comment.id ? { ...c, ...comment } : c,
            ),
          };
        },
      );
      return { previousComments };
    },
    onError: (_, comment, context) => {
      queryClient.setQueryData(
        ['comments', comment.postId],
        context?.previousComments,
      );
    },
    // Mock API 특성상 무효화 하지 않음. => 실 데이터가 변경되지 않기때문에 리셋됨.
    // onSettled: () => {
    //   // 댓글 목록 캐시 무효화
    //   // queryClient.invalidateQueries({ queryKey: ['comments'] });
    // },
  });
};
