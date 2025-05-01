import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Textarea,
} from '../../../shared/ui';
import { Comment } from '../model/types';

type EditCommentDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (comment: Comment) => Promise<void>;
  comment: Comment | undefined;
  setComment: (comment: Comment) => void;
};

export const EditCommentDialog = ({
  isOpen,
  onClose,
  onUpdate,
  comment,
  setComment,
}: EditCommentDialogProps) => {
  if (!comment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
          <DialogDescription>
            작성한 댓글의 내용을 수정할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={comment.body}
            onChange={(e) => setComment({ ...comment, body: e.target.value })}
          />
          <Button onClick={() => onUpdate(comment)}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
