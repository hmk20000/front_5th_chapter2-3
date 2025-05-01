import { Card, CardContent } from '../shared/ui';
import FilterLayout from '../widgets/filter/ui/FilterLayout';
import CardHeaderLayout from '../widgets/card/ui/CardHeaderLayout';
import PaginationLayout from '../widgets/pagination/ui/PaginationLayout';
import PostTableLayout from '../widgets/table/ui/PostTableLayout';
import PostTableRow from '../feature/postTable/PostTableRow';
import useUserModal from '../entities/user/hooks/useUserModal';
import useUpdatePostModal from '../entities/post/hooks/useUpdatePostModal';
import usePostDetailModal from '../entities/post/hooks/usePostDetailModal';
import usePostWithUser from '../feature/postsWithUser/hooks/usePostWithUser';

const PostsManager = () => {
  const { openUserModal, UserModal } = useUserModal();
  const { openPostDetailModal, PostDetailModal } = usePostDetailModal();
  const { openUpdatePostModal, UpdatePostModal } = useUpdatePostModal();

  const { postsWithUsers: posts, isLoading: loading } = usePostWithUser();

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

      {/* 유저 정보 보기 모달 */}
      <UserModal />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailModal />

      {/* 게시물 수정 대화상자 */}
      <UpdatePostModal />
    </Card>
  );
};

export default PostsManager;
