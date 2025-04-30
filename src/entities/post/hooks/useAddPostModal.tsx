import { useState } from 'react';
import { AddPostDialog } from '../ui/AddPostDialog';
import addPost from '../api/addPost';
import { PostDTO } from '../model/types';
import usePostsWithUserStore from '../../../feature/postsWithUser/model/store';

const useAddPostModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { posts, setPosts } = usePostsWithUserStore();

  const AddPostModal = () => {
    const [newPost, setNewPost] = useState<PostDTO>({
      title: '',
      body: '',
      userId: 1,
    });

    const handleAddPost = () => {
      addPost(newPost)
        .then((response) => {
          console.log(response);
          setPosts([response, ...posts]);
        })
        .finally(() => {
          setIsOpen(false);
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
