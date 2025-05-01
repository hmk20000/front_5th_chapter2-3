import { useQuery } from '@tanstack/react-query';
import fetchUser from '../api/fetchUser';

export const useUserQuery = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });
};
