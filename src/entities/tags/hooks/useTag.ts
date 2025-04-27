import { useQuery } from '@tanstack/react-query';
import { Tag } from '../model';
import fetchTag from '../api/fetchTag';

export const useTag = () => {
  return useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: () => fetchTag(),
  });
};
