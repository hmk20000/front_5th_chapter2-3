import { useSelectedPostStore } from '../../../feature/postDetail/model/store';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Input,
  Textarea,
} from '../../../shared/ui';
import { Post } from '../model/types';
interface EditPostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (post: Post) => void;
}

export const EditPostDialog = ({
  isOpen,
  onClose,
  onUpdate,
}: EditPostDialogProps) => {
  const { selectedPost: post, setSelectedPost: setPost } =
    useSelectedPostStore();

  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
          <DialogDescription>
            게시물의 제목과 내용을 수정할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
          />
          <Button onClick={() => onUpdate(post)}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
