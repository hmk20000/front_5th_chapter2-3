import { useState } from 'react';
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
  post: Post | undefined;
}

export const EditPostDialog = ({
  isOpen,
  onClose,
  onUpdate,
  post,
}: EditPostDialogProps) => {
  const [editPost, setEditPost] = useState<Post | undefined>(post);

  const handleUpdate = (post: Post) => {
    onUpdate(post);
    onClose();
  };

  return (
    editPost && (
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
              value={editPost.title}
              onChange={(e) =>
                setEditPost({ ...editPost, title: e.target.value })
              }
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={editPost.body}
              onChange={(e) =>
                setEditPost({ ...editPost, body: e.target.value })
              }
            />
            <Button onClick={() => handleUpdate(editPost)}>
              게시물 업데이트
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  );
};
