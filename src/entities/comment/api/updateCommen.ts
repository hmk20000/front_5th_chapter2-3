import { Comment } from '../model/types';

export const updateComment = async (comment: Comment) => {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ body: comment.body }),
  });
  return response.json();
};
