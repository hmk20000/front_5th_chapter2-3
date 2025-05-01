import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../../shared/ui';
import { Button } from '../../../shared/ui/Button';
import { Edit2, Plus, ThumbsUp, Trash2 } from 'lucide-react';
import { useComment } from '../../comment/hooks/useComment';
import { useSelectedPostStore } from '../../../feature/postDetail/model/store';
import { AddCommentDialog } from '../../comment/ui/AddCommentDialog';
import useEditCommentModal from '../../comment/hooks/useEditCommentModal';
import { useState } from 'react';
import { Comment } from '../../comment/model/types';

interface PostDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onDeleteComment: (id: string) => void;
  onLikeComment: (id: string) => void;
}

export const PostDetailDialog = ({
  isOpen,
  onClose,
  searchQuery,
  onDeleteComment,
  onLikeComment,
}: PostDetailDialogProps) => {
  // if (!post) return null;
  const { selectedPost: post } = useSelectedPostStore();
  const { data } = useComment();
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false);
  const { EditCommentModal, openEditCommentModal } = useEditCommentModal();

  const highlightText = (text: string, highlight: string) => {
    if (!text) return null;
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i}>{part}</mark>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </span>
    );
  };

  const handleEditComment = (comment: Comment) => {
    openEditCommentModal(comment);
  };

  return (
    post && (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(post.title, searchQuery)}</DialogTitle>
            <DialogDescription>
              게시물의 상세 내용과 댓글을 확인할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(post.body, searchQuery)}</p>
            <div className="mt-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">댓글</h3>
                <Button size="sm" onClick={() => setShowAddCommentDialog(true)}>
                  <Plus className="w-3 h-3 mr-1" />
                  댓글 추가
                </Button>
              </div>
              <div className="space-y-1">
                {data &&
                  data.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex items-center justify-between text-sm border-b pb-1"
                    >
                      <div className="flex items-center space-x-2 overflow-hidden">
                        <span className="font-medium truncate">
                          {comment.user.username}:
                        </span>
                        <span className="truncate">
                          {highlightText(comment.body, searchQuery)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onLikeComment(comment.id)}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span className="ml-1 text-xs">{comment.likes}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditComment(comment)}
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteComment(comment.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* 댓글 추가 대화상자 */}
          <AddCommentDialog
            isOpen={showAddCommentDialog}
            onClose={() => setShowAddCommentDialog(false)}
          />

          {/* 댓글 수정 대화상자 */}
          <EditCommentModal />
        </DialogContent>
      </Dialog>
    )
  );
};
