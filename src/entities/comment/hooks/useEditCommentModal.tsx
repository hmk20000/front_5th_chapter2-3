import { useState } from 'react';
import { Comment } from '../model/types';
import { EditCommentDialog } from '../ui/EditCommentDialog';

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

  const openEditCommentModal = (comment: Comment) => {
    setState((prev) => ({ ...prev, isOpen: true, comment }));
  };

  const closeEditCommentModal = () => {
    setState((prev) => ({ ...prev, isOpen: false, comment: undefined }));
  };

  const EditCommentModal = ({
    onUpdate,
  }: {
    onUpdate: (comment: Comment) => Promise<void>;
  }) => {
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
