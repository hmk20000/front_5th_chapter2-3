import { useMutation, useQueryClient } from '@tanstack/react-query';
import deletePost from '../api/deletePost';
import { FetchPostsResponse } from '../../../entities/post/api/types';

export const useDeletePostQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onMutate: async (postId: string) => {
      // 기존 쿼리 취소
      await queryClient.cancelQueries({
        predicate: (query) => query.queryKey[0] === 'posts',
      });

      // 이전 데이터 저장
      const previousQueries = queryClient.getQueriesData<FetchPostsResponse>({
        predicate: (query) => query.queryKey[0] === 'posts',
      });

      // 낙관적 업데이트
      queryClient.setQueriesData<FetchPostsResponse>(
        { predicate: (query) => query.queryKey[0] === 'posts' },
        (old) => {
          if (!old) return { posts: [], total: 0, skip: 0, limit: 0 };
          return {
            ...old,
            posts: old.posts.filter((post) => post.id !== postId),
            total: Math.max(0, old.total - 1),
          };
        },
      );

      return { previousQueries };
    },
    onError: (_, __, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
  });
};
