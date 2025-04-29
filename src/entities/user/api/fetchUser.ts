import { UserDetail } from '../model/types';

export const fetchUser = async (userId: number): Promise<UserDetail> => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
};

export default fetchUser;
