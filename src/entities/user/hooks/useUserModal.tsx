import { useState } from 'react';
import { User } from '../model/types';
import { UserModal as UserModalComponent } from '../ui/UserModal';
import { useUserQuery } from './useUserQuery';

type UserModalState = {
  isOpen: boolean;
  userId: string | undefined;
};

const useUserModal = () => {
  const [state, setState] = useState<UserModalState>({
    isOpen: false,
    userId: undefined,
  });

  const { data: user } = useUserQuery(state.userId || '');

  const openUserModal = (user: User) => {
    setState({ isOpen: true, userId: user.id.toString() });
  };

  const resetState = () =>
    setState((prev) => ({ ...prev, isOpen: false, userId: undefined }));

  const UserModal = () => {
    return (
      <UserModalComponent
        isOpen={state.isOpen}
        userDetail={user}
        onClose={resetState}
      />
    );
  };

  return { openUserModal, UserModal };
};

export default useUserModal;
