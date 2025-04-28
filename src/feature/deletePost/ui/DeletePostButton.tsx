import { Button } from '../../../shared/ui/Button';
import { Trash2 } from 'lucide-react';
import deletePost from '../api/deletePost';
import usePostsWithUserStore from '../../postsWithUser/model/store';
const DeletePostButton = ({ postId }: { postId: string }) => {
  const { posts, setPosts } = usePostsWithUserStore();
  const handleDelete = (postId: string) => {
    deletePost(postId).then(() => {
      setPosts(posts.filter((post) => post.id !== postId));
    });
  };
  return (
    <Button variant="ghost" size="sm" onClick={() => handleDelete(postId)}>
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};

export default DeletePostButton;
