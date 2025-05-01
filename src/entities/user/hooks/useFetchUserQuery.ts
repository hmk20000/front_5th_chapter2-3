import { useQuery } from '@tanstack/react-query';
import fetchUsers from '../api/fetchUsers';

export const useFetchUserQuery = () => {
  return useQuery({ queryKey: ['users'], queryFn: fetchUsers });
};
