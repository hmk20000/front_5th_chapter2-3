import { FetchPostsResponse } from './types';

const fetchPost = async (
  limit: number,
  skip: number,
): Promise<FetchPostsResponse> => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`);
  return response.json();
};

export default fetchPost;
