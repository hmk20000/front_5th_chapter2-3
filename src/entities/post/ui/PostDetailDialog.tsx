import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../../shared/ui';
import { Button } from '../../../shared/ui/Button';
import { Edit2, Plus, ThumbsUp, Trash2 } from 'lucide-react';
import { useFetchCommentQuery } from '../../comment/hooks/useFetchCommentQuery';
import { AddCommentDialog } from '../../comment/ui/AddCommentDialog';
import useEditCommentModal from '../../comment/hooks/useEditCommentModal';
import { useState } from 'react';
import { Comment } from '../../comment/model/types';
import { useFilter } from '../../../feature/filter/hooks/useFilter';
import { useDeleteComment } from '../../comment/hooks/useDeleteComment';
import { useLikeComment } from '../../comment/hooks/useLikeComment';
import { Post } from '../model';
interface PostDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | undefined;
}

export const PostDetailDialog = ({
  isOpen,
  onClose,
  post,
}: PostDetailDialogProps) => {
  const { data } = useFetchCommentQuery(post?.id || '');
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false);
  const { EditCommentModal, openEditCommentModal } = useEditCommentModal();
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: likeComment } = useLikeComment();
  const [filter] = useFilter();

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

  const handleDeleteComment = (comment: Comment) => {
    deleteComment(comment);
  };

  const handleLikeComment = (comment: Comment) => {
    likeComment(comment);
  };

  return (
    post && (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {highlightText(post.title, filter.search)}
            </DialogTitle>
            <DialogDescription>
              게시물의 상세 내용과 댓글을 확인할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(post.body, filter.search)}</p>
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
                          {highlightText(comment.body, filter.search)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLikeComment(comment)}
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
                          onClick={() => handleDeleteComment(comment)}
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
            post={post}
          />

          {/* 댓글 수정 대화상자 */}
          <EditCommentModal />
        </DialogContent>
      </Dialog>
    )
  );
};
