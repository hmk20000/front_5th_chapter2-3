import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../shared/ui';
import { Post } from '../entities/post/model/types';
import { Comment } from '../entities/comment/model/types';
import { createPostsWithUsers } from '../feature/postsWithUser/lib';
import fetchUsers from '../entities/user/api/fetchUsers';
import fetchPost from '../entities/post/api/fetchPost';
import useSelectedTags from '../feature/selectTags/hooks/useSelectedTags';
import { PostDetailDialog } from '../entities/post/ui/PostDetailDialog';
import { AddCommentDialog } from '../entities/comment/ui/AddCommentDialog';
import CardHeaderLayout from '../widgets/card/ui/CardHeaderLayout';
import FilterLayout from '../widgets/filter/ui/FilterLayout';
import PaginationLayout from '../widgets/pagination/ui/PaginationLayout';
import usePaginationStore from '../feature/pagination/model/store';
import PostTableLayout from '../widgets/table/ui/PostTableLayout';
import PostTableRow from '../feature/postTable/PostTableRow';
import usePostsWithUserStore from '../feature/postsWithUser/model/store';
import useUserModal from '../entities/user/hooks/useUserModal';
import useEditCommentModal from '../entities/comment/hooks/useEditCommentModal';
import { useSelectedPostStore } from '../feature/postDetail/model/store';
import useUpdatePostModal from '../entities/post/hooks/useUpdatePostModal';
import { useCommentStore } from '../entities/comment/model/store';

const PostsManager = () => {
  const navigate = useNavigate();
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
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false);
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false);
  const { selectedTag, setSelectedTag } = useSelectedTags();

  const { limit, skip, setTotal } = usePaginationStore();
  const { posts, setPosts } = usePostsWithUserStore();
  const { selectedPost, setSelectedPost } = useSelectedPostStore();
  const { comments, setComments } = useCommentStore();

  const { openUserModal, UserModal } = useUserModal();
  const {
    openEditCommentModal,
    EditCommentModal,
    state,
    closeEditCommentModal,
  } = useEditCommentModal();

  const { setIsOpen: setShowEditDialog, UpdatePostModal } =
    useUpdatePostModal();

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams();
    if (skip) params.set('skip', skip.toString());
    if (limit) params.set('limit', limit.toString());
    if (searchQuery) params.set('search', searchQuery);
    if (sortBy) params.set('sortBy', sortBy);
    if (sortOrder) params.set('sortOrder', sortOrder);
    if (selectedTag) params.set('tag', selectedTag);
    navigate(`?${params.toString()}`);
  };

  // 게시물 가져오기
  const fetchPosts = () => {
    setLoading(true);
    try {
      Promise.all([fetchPost(limit, skip), fetchUsers()]).then(
        ([postsData, usersData]) => {
          const postsWithUsers = createPostsWithUsers(
            postsData.posts,
            usersData.users,
          );
          setPosts(postsWithUsers);
          setTotal(postsData.total);
        },
      );
    } catch (error) {
      console.error('게시물 가져오기 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts();
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`);
      const data = await response.json();
      setPosts(data.posts);
      setTotal(data.total);
    } catch (error) {
      console.error('게시물 검색 오류:', error);
    }
    setLoading(false);
  };

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === 'all') {
      fetchPosts();
      return;
    }
    setLoading(true);
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch('/api/users?limit=0&select=username,image'),
      ]);
      const postsData = await postsResponse.json();
      const usersData = await usersResponse.json();

      const postsWithUsers = createPostsWithUsers(
        postsData.posts,
        usersData.users,
      );

      setPosts(postsWithUsers);
      setTotal(postsData.total);
    } catch (error) {
      console.error('태그별 게시물 가져오기 오류:', error);
    }
    setLoading(false);
  };

  // 댓글 가져오기
  // const fetchComments = async (postId: string) => {
  //   if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
  //   try {
  //     const response = await fetch(`/api/comments/post/${postId}`);
  //     const data = await response.json();

  //   } catch (error) {
  //     console.error('댓글 가져오기 오류:', error);
  //   }
  // };

  // 댓글 업데이트
  const updateComment = async () => {
    try {
      const response = await fetch(`/api/comments/${state.comment?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: state.comment?.body }),
      });
      const data = await response.json();
      setComments({
        ...comments,
        [data.postId]: comments[data.postId].map((comment: Comment) =>
          comment.id === data.id ? data : comment,
        ),
      });
      closeEditCommentModal();
    } catch (error) {
      console.error('댓글 업데이트 오류:', error);
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
    if (selectedTag) {
      fetchPostsByTag(selectedTag);
    } else {
      fetchPosts();
    }
    updateURL();
  }, [skip, limit, sortBy, sortOrder, selectedTag]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    // setSkip(parseInt(params.get('skip') || '0'));
    // setLimit(parseInt(params.get('limit') || '10'));
    setSearchQuery(params.get('search') || '');
    setSortBy(params.get('sortBy') || '');
    setSortOrder(params.get('sortOrder') || 'asc');
    setSelectedTag(params.get('tag') || '');
  }, [location.search]);

  const handleTagChange = (tag: string) => {
    fetchPostsByTag(tag);
    updateURL();
  };

  const handleEditComment = (comment: Comment) => {
    openEditCommentModal(comment);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeaderLayout />
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <FilterLayout
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchPosts={searchPosts}
            handleTagChange={handleTagChange}
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
                  selectedTag={selectedTag}
                  setSelectedTag={setSelectedTag}
                  openUserModal={openUserModal}
                  openPostDetail={openPostDetail}
                  setShowEditDialog={setShowEditDialog}
                  updateURL={updateURL}
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
        onAddComment={() => setShowAddCommentDialog(true)}
        onEditComment={handleEditComment}
        onDeleteComment={(id) => deleteComment(id, selectedPost?.id || '')}
        onLikeComment={(id) => likeComment(id, selectedPost?.id || '')}
      />

      {/* 댓글 추가 대화상자 */}
      <AddCommentDialog
        isOpen={showAddCommentDialog}
        onClose={() => setShowAddCommentDialog(false)}
      />

      {/* 댓글 수정 대화상자 */}
      <EditCommentModal onUpdate={updateComment} />

      <UserModal />
    </Card>
  );
};

export default PostsManager;
