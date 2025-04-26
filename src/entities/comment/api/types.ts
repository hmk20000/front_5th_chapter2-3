import { PaginationMeta } from '../../../shared/api/types';
import { Comment } from '../model/types';

export interface FetchCommentsResponse extends PaginationMeta {
  comments: Comment[];
}

export interface CreateCommentRequest {
  body: string;
  postId: number | null;
  userId: number;
}
