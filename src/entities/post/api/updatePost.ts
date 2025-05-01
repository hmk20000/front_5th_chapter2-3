import { Post } from '../model/types';

export const updatePost = async (post: Post) => {
  const response = await fetch(`/api/posts/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: post.title,
    }),
  });
  return response.json();
};
