import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from '../../../shared/ui';
import { PostDTO } from '../model/types';
interface AddPostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
  newPost: PostDTO;
  setNewPost: (post: PostDTO) => void;
}

export const AddPostDialog = ({
  isOpen,
  onClose,
  onAdd,
  newPost,
  setNewPost,
}: AddPostDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) =>
              setNewPost({ ...newPost, userId: Number(e.target.value) })
            }
          />
          <Button onClick={onAdd}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
