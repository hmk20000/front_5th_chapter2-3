import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from '../shared/ui';
import { Post } from '../entities/post/model/types';
import { Comment } from '../entities/comment/model/types';
import { createPostsWithUsers } from '../feature/postsWithUser/lib';
import fetchUsers from '../entities/user/api/fetchUsers';
import fetchPost from '../entities/post/api/fetchPost';
import { PostDetailDialog } from '../entities/post/ui/PostDetailDialog';
import CardHeaderLayout from '../widgets/card/ui/CardHeaderLayout';
import FilterLayout from '../widgets/filter/ui/FilterLayout';
import PaginationLayout from '../widgets/pagination/ui/PaginationLayout';
import usePaginationStore from '../feature/pagination/model/store';
import PostTableLayout from '../widgets/table/ui/PostTableLayout';
import PostTableRow from '../feature/postTable/PostTableRow';
import usePostsWithUserStore from '../feature/postsWithUser/model/store';
import useUserModal from '../entities/user/hooks/useUserModal';
import { useSelectedPostStore } from '../feature/postDetail/model/store';
import useUpdatePostModal from '../entities/post/hooks/useUpdatePostModal';
import { useCommentStore } from '../entities/comment/model/store';
import { Filters, useFilter } from '../feature/filter/hooks/useFilter';

const PostsManager = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 상태 관리
  const [searchQuery, setSearchQuery] = useState(
    queryParams.get('search') || '',
  );
  const [sortBy, setSortBy] = useState(queryParams.get('sortBy') || '');
  const [sortOrder, setSortOrder] = useState(
    queryParams.get('sortOrder') || 'asc',
  );
  const [loading, setLoading] = useState(false);
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false);

  const { setTotal } = usePaginationStore();
  const { posts, setPosts } = usePostsWithUserStore();
  const { selectedPost, setSelectedPost } = useSelectedPostStore();
  const { comments, setComments } = useCommentStore();

  const { openUserModal, UserModal } = useUserModal();

  const { setIsOpen: setShowEditDialog, UpdatePostModal } =
    useUpdatePostModal();

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

  // 댓글 삭제
  const deleteComment = async (id: string, postId: string) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
      setComments({
        ...comments,
        [postId]: comments[postId].filter(
          (comment: Comment) => comment.id !== id,
        ),
      });
    } catch (error) {
      console.error('댓글 삭제 오류:', error);
    }
  };

  // 댓글 좋아요
  const likeComment = async (id: string, postId: string) => {
    try {
      const comment = comments[postId]?.find((c) => c.id === id);
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          likes: comment ? comment.likes + 1 : 1,
        }),
      });
      const data = await response.json();
      setComments({
        ...comments,
        [postId]: comments[postId].map((comment: Comment) =>
          comment.id === data.id
            ? { ...data, likes: comment.likes + 1 }
            : comment,
        ),
      });
    } catch (error) {
      console.error('댓글 좋아요 오류:', error);
    }
  };

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    setShowPostDetailDialog(true);
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
          <FilterLayout
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTableLayout>
              {posts.map((post) => (
                <PostTableRow
                  key={post.id}
                  post={post}
                  searchQuery={searchQuery}
                  openUserModal={openUserModal}
                  openPostDetail={openPostDetail}
                  setShowEditDialog={setShowEditDialog}
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
      <PostDetailDialog
        isOpen={showPostDetailDialog}
        onClose={() => setShowPostDetailDialog(false)}
        searchQuery={searchQuery}
        onDeleteComment={(id) => deleteComment(id, selectedPost?.id || '')}
        onLikeComment={(id) => likeComment(id, selectedPost?.id || '')}
      />

      <UserModal />
    </Card>
  );
};

export default PostsManager;
