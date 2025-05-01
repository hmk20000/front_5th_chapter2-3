import { Comment } from '../model/types';

export const likeComment = async (comment: Comment): Promise<Comment> => {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      likes: comment.likes + 1,
    }),
  });
  return response.json();
};
