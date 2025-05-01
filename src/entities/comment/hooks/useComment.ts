import { useQuery } from '@tanstack/react-query';
import { fetchComments } from '../api/fetchComments';
import { useSelectedPostStore } from '../../../feature/postDetail/model/store';

export const useComment = () => {
  const { selectedPost } = useSelectedPostStore();
  return useQuery({
    queryKey: ['comments', selectedPost?.id],
    queryFn: () =>
      selectedPost
        ? fetchComments(selectedPost.id)
        : Promise.resolve({
            comments: [],
            total: 0,
            skip: 0,
            limit: 0,
          }),
    enabled: !!selectedPost,
  });
};
