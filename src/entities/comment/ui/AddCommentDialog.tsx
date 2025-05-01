import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Textarea,
} from '../../../shared/ui';
import { CreateCommentRequest } from '../api/types';
import { Post } from '../../post/model/types';
import { useAddComment } from '../hooks/useAddComment';
interface AddCommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
}

export const AddCommentDialog = ({
  isOpen,
  onClose,
  post,
}: AddCommentDialogProps) => {
  const [comment, setComment] = useState<CreateCommentRequest>({
    body: '',
    postId: post.id,
    userId: post.userId,
  });
  const { mutateAsync: addComment } = useAddComment();

  const handleAddComment = async () => {
    await addComment(comment);
    onClose();
    setComment({ body: '', postId: post.id, userId: 1 });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
          <DialogDescription>
            게시물에 대한 새로운 댓글을 작성할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={comment?.body || ''}
            onChange={(e) => setComment({ ...comment, body: e.target.value })}
          />
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
