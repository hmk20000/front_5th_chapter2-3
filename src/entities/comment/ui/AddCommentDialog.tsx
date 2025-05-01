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

interface AddCommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
  comment: CreateCommentRequest | undefined;
  setComment: (comment: CreateCommentRequest) => void;
}

export const AddCommentDialog = ({
  isOpen,
  onClose,
  onAdd,
  comment,
  setComment,
}: AddCommentDialogProps) => {
  if (!comment) return null;

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
            value={comment.body || ''}
            onChange={(e) => setComment({ ...comment, body: e.target.value })}
          />
          <Button onClick={onAdd}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
