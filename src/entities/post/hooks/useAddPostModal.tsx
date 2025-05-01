import { useState } from 'react';
import { AddPostDialog } from '../ui/AddPostDialog';
import { PostDTO } from '../model/types';
import { useAddPostQuery } from './useAddPostQuery';

const useAddPostModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: addPost } = useAddPostQuery();

  const AddPostModal = () => {
    const [newPost, setNewPost] = useState<PostDTO>({
      title: '',
      body: '',
      userId: 1,
    });

    const handleAddPost = () => {
      addPost(newPost, {
        onSettled: () => {
          setIsOpen(false);
        },
      });
    };

    return (
      <AddPostDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={handleAddPost}
        newPost={newPost}
        setNewPost={setNewPost}
      />
    );
  };

  return {
    isOpen,
    setIsOpen,
    AddPostModal,
  };
};

export default useAddPostModal;
