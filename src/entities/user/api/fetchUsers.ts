import { FetchUsersResponse } from './types';

export const fetchUsers = async (): Promise<FetchUsersResponse> => {
  const response = await fetch('/api/users?limit=0&select=username,image');
  return response.json();
};

export default fetchUsers;
