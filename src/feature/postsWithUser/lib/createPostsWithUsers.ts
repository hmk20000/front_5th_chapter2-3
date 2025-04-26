import { Post } from '../../../entities/post/model/types';
import { User } from '../../../entities/user/model/types';
import { PostWithUser } from '../model/types';

export const createPostsWithUsers = (
  posts: Post[],
  users: User[],
): PostWithUser[] => {
  return posts
    .map((post) => ({
      ...post,
      author: users.find((user) => user.id === post.userId),
    }))
    .filter((post): post is PostWithUser => post.author !== undefined);
};
