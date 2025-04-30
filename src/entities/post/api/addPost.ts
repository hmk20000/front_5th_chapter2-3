import { PostDTO } from '../model/types';

const addPost = async (post: PostDTO) => {
  const response = await fetch('/api/posts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  return response.json();
};

export default addPost;
