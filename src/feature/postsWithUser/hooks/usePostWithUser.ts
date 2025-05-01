import { useMemo } from 'react';
import { useFetchUserQuery } from '../../../entities/user/hooks/useFetchUserQuery';
import { useFetchPostQuery } from '../../../entities/post/hooks/useFetchPostQuery';
import { useFilter } from '../../filter/hooks/useFilter';
import { createPostsWithUsers } from '../lib/createPostsWithUsers';

const usePostWithUser = () => {
  const [filter] = useFilter();
  const { data: posts, isFetching: isPostsFetching } =
    useFetchPostQuery(filter);
  const { data: users, isFetching: isUsersFetching } = useFetchUserQuery();

  const postsWithUsers = useMemo(() => {
    return createPostsWithUsers(posts?.posts || [], users?.users || []);
  }, [posts, users]);

  const isLoading = isPostsFetching || isUsersFetching;

  return {
    postsWithUsers,
    isLoading,
  };
};

export default usePostWithUser;
