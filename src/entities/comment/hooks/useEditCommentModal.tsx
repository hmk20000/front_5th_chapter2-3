import { useState } from 'react';
import { Comment } from '../model/types';
import { EditCommentDialog } from '../ui/EditCommentDialog';
import { useUpdateComment } from './useUpdateComment';

type EditCommentModalState = {
  isOpen: boolean;
  comment: Comment | undefined;
  isLoading: boolean;
};

const useEditCommentModal = () => {
  const [state, setState] = useState<EditCommentModalState>({
    isOpen: false,
    comment: undefined,
    isLoading: false,
  });
  const { mutateAsync: updateComment } = useUpdateComment();

  const openEditCommentModal = (comment: Comment) => {
    setState((prev) => ({ ...prev, isOpen: true, comment }));
  };

  const closeEditCommentModal = () => {
    setState((prev) => ({ ...prev, isOpen: false, comment: undefined }));
  };

  const onUpdate = async (comment: Comment) => {
    // 리액트쿼리 뮤태이트로 낙관적 업데이트 처리
    await updateComment(comment);
    closeEditCommentModal();
  };

  const EditCommentModal = () => {
    return (
      <EditCommentDialog
        isOpen={state.isOpen}
        onClose={closeEditCommentModal}
        onUpdate={onUpdate}
        comment={state.comment}
        setComment={(comment) => setState((prev) => ({ ...prev, comment }))}
      />
    );
  };

  return {
    openEditCommentModal,
    EditCommentModal,
    state,
    closeEditCommentModal,
  };
};

export default useEditCommentModal;
