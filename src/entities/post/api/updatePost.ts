import { Post } from '../model/types';

export const updatePost = async (post: Post) => {
  const response = await fetch(`/api/posts/${post.id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
  });
  console.log(response.json(), post);
  return post;
};
