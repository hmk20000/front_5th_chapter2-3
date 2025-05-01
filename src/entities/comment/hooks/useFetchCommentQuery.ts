import { useQuery } from '@tanstack/react-query';
import { fetchComments } from '../api/fetchComments';

export const useFetchCommentQuery = (postId: string) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
  });
};
