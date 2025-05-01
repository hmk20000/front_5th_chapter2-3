import { useState } from 'react';
import { Post } from '../model/types';
import { EditPostDialog } from '../ui/EditPostDialog';
import { useUpdatePostQuery } from './useUpdatePostQuery';

const useUpdatePostModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState<Post>();
  const { mutate: updatePost } = useUpdatePostQuery();

  const handleUpdatePost = (post: Post) => {
    updatePost(post);
    setIsOpen(false);
  };

  const UpdatePostModal = () => {
    return (
      <EditPostDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onUpdate={handleUpdatePost}
        post={post}
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
