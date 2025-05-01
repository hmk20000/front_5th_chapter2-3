import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost } from '../api/updatePost';
import { Post } from '../model/types';
import { FetchPostsResponse } from '../api/types';

export const useUpdatePostQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onMutate: async (updatedPost: Post) => {
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
            posts: old.posts.map((post) =>
              post.id === updatedPost.id ? { ...post, ...updatedPost } : post,
            ),
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
    // Mock API 특성상 무효화 하지 않음. => 실 데이터가 변경되지 않기때문에 리셋됨.
    // onSettled: () => {
    //   // 서버 데이터와 동기화
    //   queryClient.invalidateQueries({ queryKey: ['posts'] });
    // },
  });
};
