import { FetchPostsResponse } from './types';

const fetchPost = async (params: {
  limit?: number;
  skip?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  tag?: string;
}): Promise<FetchPostsResponse> => {
  const { limit, skip, search, sortBy, sortOrder, tag } = params;
  const searchParams = new URLSearchParams();

  if (limit) searchParams.set('limit', limit.toString());
  if (skip) searchParams.set('skip', skip.toString());
  if (search) searchParams.set('search', search);
  if (sortBy) searchParams.set('sortBy', sortBy);
  if (sortOrder) searchParams.set('sortOrder', sortOrder);

  if (tag) {
    const response = await fetch(
      `/api/posts/tag/${tag}?${searchParams.toString()}`,
    );
    return response.json();
  }

  const response = await fetch(`/api/posts?${searchParams.toString()}`);
  return response.json();
};

export default fetchPost;
