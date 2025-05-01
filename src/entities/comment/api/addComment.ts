import { CreateCommentRequest } from './types';

export const addComment = async (comment: CreateCommentRequest) => {
  const response = await fetch('/api/comments/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  });
  return response.json();
};
