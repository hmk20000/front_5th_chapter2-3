import { Post } from '../../../entities/post/model/types';
import { User } from '../../../entities/user/model/types';

export interface PostWithUser extends Post {
  author: User;
}
