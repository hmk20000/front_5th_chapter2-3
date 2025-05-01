import { useEffect, useState } from 'react';
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
import { useCommentStore } from '../model/store';
import { useSelectedPostStore } from '../../../feature/postDetail/model/store';
interface AddCommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCommentDialog = ({
  isOpen,
  onClose,
}: AddCommentDialogProps) => {
  const { comments, setComments } = useCommentStore();
  const { selectedPost } = useSelectedPostStore();

  const [comment, setComment] = useState<CreateCommentRequest>({
    body: '',
    postId: selectedPost?.id || null,
    userId: selectedPost?.userId || 1,
  });

  useEffect(() => {
    if (selectedPost) {
      setComment({
        ...comment,
        postId: selectedPost.id,
        userId: selectedPost.userId,
      });
    }
  }, [selectedPost]);

  // 댓글 추가
  const addComment = async () => {
    try {
      const response = await fetch('/api/comments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment),
      });
      const data = await response.json();
      setComments({
        ...comments,
        [data.postId]: [...(comments[data.postId] || []), data],
      });
      onClose();
      setComment({ body: '', postId: null, userId: 1 });
    } catch (error) {
      console.error('댓글 추가 오류:', error);
    }
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
          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
