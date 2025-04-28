import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../shared/ui';
import { Post } from '../entities/post/model/types';
import { User, UserDetail } from '../entities/user/model/types';
import { Comment } from '../entities/comment/model/types';
import { CreateCommentRequest } from '../entities/comment/api/types';
import { createPostsWithUsers } from '../feature/postsWithUser/lib';
import fetchUser from '../entities/user/api/fetchUser';
import fetchPost from '../entities/post/api/fetchPost';
import useSelectedTags from '../feature/selectTags/hooks/useSelectedTags';
import { UserModal } from '../entities/user/ui/UserModal';
import { AddPostDialog } from '../entities/post/ui/AddPostDialog';
import { EditPostDialog } from '../entities/post/ui/EditPostDialog';
import { PostDetailDialog } from '../entities/post/ui/PostDetailDialog';
import { AddCommentDialog } from '../entities/comment/ui/AddCommentDialog';
import { EditCommentDialog } from '../entities/comment/ui/EditCommentDialog';
import CardHeaderLayout from '../widgets/card/ui/CardHeaderLayout';
import FilterLayout from '../widgets/filter/ui/FilterLayout';
import PaginationLayout from '../widgets/pagination/ui/PaginationLayout';
import usePaginationStore from '../feature/pagination/model/store';
import PostTableLayout from '../widgets/table/ui/PostTableLayout';
import PostTableRow from '../feature/postTable/PostTableRow';
import usePostsWithUserStore from '../feature/postsWithUser/model/store';
const PostsManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 상태 관리
  const [searchQuery, setSearchQuery] = useState(
    queryParams.get('search') || '',
  );
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [sortBy, setSortBy] = useState(queryParams.get('sortBy') || '');
  const [sortOrder, setSortOrder] = useState(
    queryParams.get('sortOrder') || 'asc',
  );
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '', userId: 1 });
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [selectedComment, setSelectedComment] = useState<Comment>();
  const [newComment, setNewComment] = useState<CreateCommentRequest>();
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false);
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false);
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUserDetail, setSelectedUserDetail] = useState<UserDetail>();
  const { selectedTag, setSelectedTag } = useSelectedTags();

  const { limit, skip, setTotal } = usePaginationStore();
  const { posts, setPosts } = usePostsWithUserStore();

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams();
    // if (skip) params.set('skip', skip.toString());
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
      Promise.all([fetchPost(limit, skip), fetchUser()]).then(
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

  // 게시물 추가
  const addPost = async () => {
    try {
      const response = await fetch('/api/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      setPosts([data, ...posts]);
      setShowAddDialog(false);
      setNewPost({ title: '', body: '', userId: 1 });
    } catch (error) {
      console.error('게시물 추가 오류:', error);
    }
  };

  // 게시물 업데이트
  const updatePost = async () => {
    try {
      const response = await fetch(`/api/posts/${selectedPost?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedPost),
      });
      const data = await response.json();
      setPosts(posts.map((post) => (post.id === data.id ? data : post)));
      setShowEditDialog(false);
    } catch (error) {
      console.error('게시물 업데이트 오류:', error);
    }
  };

  // 댓글 가져오기
  const fetchComments = async (postId: string) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const response = await fetch(`/api/comments/post/${postId}`);
      const data = await response.json();
      setComments((prev) => ({ ...prev, [postId]: data.comments }));
    } catch (error) {
      console.error('댓글 가져오기 오류:', error);
    }
  };

  // 댓글 추가
  const addComment = async () => {
    try {
      const response = await fetch('/api/comments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });
      const data = await response.json();
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }));
      setShowAddCommentDialog(false);
      setNewComment({ body: '', postId: null, userId: 1 });
    } catch (error) {
      console.error('댓글 추가 오류:', error);
    }
  };

  // 댓글 업데이트
  const updateComment = async () => {
    try {
      const response = await fetch(`/api/comments/${selectedComment?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: selectedComment?.body }),
      });
      const data = await response.json();
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) =>
          comment.id === data.id ? data : comment,
        ),
      }));
      setShowEditCommentDialog(false);
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
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }));
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
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id
            ? { ...data, likes: comment.likes + 1 }
            : comment,
        ),
      }));
    } catch (error) {
      console.error('댓글 좋아요 오류:', error);
    }
  };

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    fetchComments(post.id);
    setShowPostDetailDialog(true);
  };

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    try {
      const response = await fetch(`/api/users/${user.id}`);
      const userData: UserDetail = await response.json();
      setSelectedUserDetail(userData);
      setShowUserModal(true);
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error);
    }
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

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeaderLayout setShowAddDialog={setShowAddDialog} />
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
                  setSelectedPost={setSelectedPost}
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

      {/* 게시물 추가 대화상자 */}
      <AddPostDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={addPost}
        newPost={newPost}
        setNewPost={setNewPost}
      />

      {/* 게시물 수정 대화상자 */}
      <EditPostDialog
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        onUpdate={updatePost}
        post={selectedPost}
        setPost={setSelectedPost}
      />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog
        isOpen={showPostDetailDialog}
        onClose={() => setShowPostDetailDialog(false)}
        post={selectedPost}
        searchQuery={searchQuery}
        comments={comments[selectedPost?.id || ''] || []}
        onAddComment={() => setShowAddCommentDialog(true)}
        onEditComment={(comment) => {
          setSelectedComment(comment);
          setShowEditCommentDialog(true);
        }}
        onDeleteComment={(id) => deleteComment(id, selectedPost?.id || '')}
        onLikeComment={(id) => likeComment(id, selectedPost?.id || '')}
      />

      {/* 댓글 추가 대화상자 */}
      <AddCommentDialog
        isOpen={showAddCommentDialog}
        onClose={() => setShowAddCommentDialog(false)}
        onAdd={addComment}
        comment={newComment}
        setComment={setNewComment}
      />

      {/* 댓글 수정 대화상자 */}
      <EditCommentDialog
        isOpen={showEditCommentDialog}
        onClose={() => setShowEditCommentDialog(false)}
        onUpdate={updateComment}
        comment={selectedComment}
        setComment={setSelectedComment}
      />

      {/* 사용자 모달 */}
      <UserModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        userDetail={selectedUserDetail}
      />
    </Card>
  );
};

export default PostsManager;
