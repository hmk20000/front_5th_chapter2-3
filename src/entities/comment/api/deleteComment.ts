import { Comment } from '../model/types';

export const deleteComment = async (comment: Comment) => {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method: 'DELETE',
  });
  return response.json();
};
