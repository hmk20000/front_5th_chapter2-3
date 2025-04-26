import { PaginationMeta } from '../../../shared/api/types';
import { Post } from '../model/types';

export interface FetchPostsResponse extends PaginationMeta {
  posts: Post[];
}
