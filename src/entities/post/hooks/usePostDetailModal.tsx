import { useState } from 'react';
import { PostDetailDialog } from '../ui/PostDetailDialog';
import { Post } from '../model';

const usePostDetailModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState<Post>();
  const PostDetailModal = () => {
    return (
      <PostDetailDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        post={post}
      />
    );
  };

  const openPostDetailModal = (post: Post) => {
    setIsOpen(true);
    setPost(post);
  };

  return {
    isOpen,
    setIsOpen,
    PostDetailModal,
    openPostDetailModal,
  };
};

export default usePostDetailModal;
