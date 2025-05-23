import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export type Filters = {
  search: string;
  sortBy: string;
  order: string;
  limit: number;
  skip: number;
  tag: string;
};

export const useFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initFilter = useCallback(
    (): Filters => ({
      search: searchParams.get('search') || '',
      sortBy: searchParams.get('sortBy') || '',
      order: searchParams.get('order') || '',
      limit: parseInt(searchParams.get('limit') || '10'),
      skip: parseInt(searchParams.get('skip') || '0'),
      tag: searchParams.get('tag') || '',
    }),
    [searchParams],
  );

  const [filter, setFilter] = useState<Filters>(initFilter());

  useEffect(() => {
    setFilter(initFilter());
  }, [initFilter]);

  const updateURL = (next: Filters) => {
    const updated = { ...filter, ...next };
    setFilter(updated);

    const params = new URLSearchParams();
    if (updated.search) params.set('search', updated.search);
    if (updated.sortBy) params.set('sortBy', updated.sortBy);
    if (updated.order) params.set('order', updated.order);
    if (updated.limit) params.set('limit', updated.limit.toString());
    if (updated.skip) params.set('skip', updated.skip.toString());
    if (updated.tag) {
      if (updated.tag === 'all') {
        params.delete('tag');
      } else {
        params.set('tag', updated.tag);
      }
    }

    setSearchParams(params);
  };

  return [filter, updateURL] as const;
};
