import { UserDetail } from '../model/types';

export const fetchUser = async (userId: string): Promise<UserDetail> => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
};

export default fetchUser;
