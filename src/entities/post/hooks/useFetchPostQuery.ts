import { useQuery } from '@tanstack/react-query';
import fetchPost from '../api/fetchPost';
import { FetchPostsResponse } from '../api/types';

export const useFetchPostQuery = (params?: {
  limit?: number;
  skip?: number;
  search?: string;
  sortBy?: string;
  order?: string;
  tag?: string;
}) => {
  return useQuery<FetchPostsResponse>({
    queryKey: ['posts', params],
    queryFn: () => fetchPost(params || {}),
  });
};
