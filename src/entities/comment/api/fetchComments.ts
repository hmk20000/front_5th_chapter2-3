import { FetchCommentsResponse } from './types';

export const fetchComments = async (
  postId: string,
): Promise<FetchCommentsResponse> => {
  const response = await fetch(`/api/comments/post/${postId}`);
  return response.json();
};
