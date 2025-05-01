import { useState } from 'react';
import { PostDetailDialog } from '../ui/PostDetailDialog';

const usePostDetailModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const PostDetailModal = () => {
    return (
      <PostDetailDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onDeleteComment={function (id: string): void {
          throw new Error('Function not implemented.');
        }}
        onLikeComment={function (id: string): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
  };
  return {
    isOpen,
    setIsOpen,
    PostDetailModal,
  };
};

export default usePostDetailModal;
