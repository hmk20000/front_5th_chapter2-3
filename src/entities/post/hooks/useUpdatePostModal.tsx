import { useState } from 'react';
import { Post } from '../model/types';
import { EditPostDialog } from '../ui/EditPostDialog';
import { updatePost } from '../api/updatePost';
import usePostsWithUserStore from '../../../feature/postsWithUser/model/store';

const useUpdatePostModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState<Post>();
  const { posts, setPosts } = usePostsWithUserStore();

  const handleUpdatePost = (post: Post) => {
    updatePost(post).then((res) => {
      setPosts(
        posts.map((p) => (p.id === post.id ? { ...res, author: p.author } : p)),
      );
      setIsOpen(false);
    });
  };

  const UpdatePostModal = () => {
    return (
      <EditPostDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onUpdate={handleUpdatePost}
      />
    );
  };

  const openUpdatePostModal = (post: Post) => {
    setIsOpen(true);
    setPost(post);
  };

  return {
    isOpen,
    setIsOpen,
    post,
    setPost,
    UpdatePostModal,
    openUpdatePostModal,
  };
};

export default useUpdatePostModal;
