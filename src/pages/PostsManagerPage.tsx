import { useEffect, useState } from 'react';
import { Card, CardContent } from '../shared/ui';
import { createPostsWithUsers } from '../feature/postsWithUser/lib';
import fetchUsers from '../entities/user/api/fetchUsers';
import fetchPost from '../entities/post/api/fetchPost';
import CardHeaderLayout from '../widgets/card/ui/CardHeaderLayout';
import FilterLayout from '../widgets/filter/ui/FilterLayout';
import PaginationLayout from '../widgets/pagination/ui/PaginationLayout';
import usePaginationStore from '../feature/pagination/model/store';
import PostTableLayout from '../widgets/table/ui/PostTableLayout';
import PostTableRow from '../feature/postTable/PostTableRow';
import usePostsWithUserStore from '../feature/postsWithUser/model/store';
import useUserModal from '../entities/user/hooks/useUserModal';
import useUpdatePostModal from '../entities/post/hooks/useUpdatePostModal';
import { Filters, useFilter } from '../feature/filter/hooks/useFilter';
import usePostDetailModal from '../entities/post/hooks/usePostDetailModal';
const PostsManager = () => {
  // 상태 관리
  const [loading, setLoading] = useState(false);

  const { setTotal } = usePaginationStore();
  const { posts, setPosts } = usePostsWithUserStore();

  const { openUserModal, UserModal } = useUserModal();
  const { openPostDetailModal, PostDetailModal } = usePostDetailModal();
  const { openUpdatePostModal, UpdatePostModal } = useUpdatePostModal();

  const [filter] = useFilter();

  // 게시물 가져오기
  const fetchPosts = (filter: Filters) => {
    setLoading(true);
    try {
      Promise.all([fetchPost(filter), fetchUsers()])
        .then(([postsData, usersData]) => {
          const postsWithUsers = createPostsWithUsers(
            postsData.posts,
            usersData.users,
          );
          setPosts(postsWithUsers);
          setTotal(postsData.total);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error('게시물 가져오기 오류:', error);
    }
  };

  useEffect(() => {
    fetchPosts(filter);
  }, [filter]);

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeaderLayout />
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <FilterLayout />

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTableLayout>
              {posts.map((post) => (
                <PostTableRow
                  key={post.id}
                  post={post}
                  openUserModal={openUserModal}
                  openPostDetail={openPostDetailModal}
                  openUpdatePostModal={openUpdatePostModal}
                />
              ))}
            </PostTableLayout>
          )}

          {/* 페이지네이션 */}
          <PaginationLayout />
        </div>
      </CardContent>

      {/* 게시물 수정 대화상자 */}
      <UpdatePostModal />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailModal />

      {/* 유저 정보 보기 모달 */}
      <UserModal />
    </Card>
  );
};

export default PostsManager;
