import { PaginationMeta } from '../../../shared/api/types';
import { User } from '../model/types';

export interface FetchUsersResponse extends PaginationMeta {
  users: User[];
}
