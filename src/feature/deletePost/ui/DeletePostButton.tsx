import { Button } from '../../../shared/ui/Button';
import { Trash2 } from 'lucide-react';
import { useDeletePostQuery } from '../hooks/useDeletePostQuery';
const DeletePostButton = ({ postId }: { postId: string }) => {
  const { mutate: deletePost } = useDeletePostQuery();
  const handleDelete = (postId: string) => {
    deletePost(postId);
  };
  return (
    <Button variant="ghost" size="sm" onClick={() => handleDelete(postId)}>
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};

export default DeletePostButton;
