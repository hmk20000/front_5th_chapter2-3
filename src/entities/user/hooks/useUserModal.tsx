import { useState } from 'react';
import { User, UserDetail } from '../model/types';
import { UserModal as UserModalComponent } from '../ui/UserModal';
import fetchUser from '../api/fetchUser';

type UserModalState = {
  isOpen: boolean;
  user: UserDetail | undefined;
  isLoading: boolean;
};

const useUserModal = () => {
  const [state, setState] = useState<UserModalState>({
    isOpen: false,
    user: undefined,
    isLoading: false,
  });

  const openUserModal = (user: User) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    fetchUser(user.id)
      .then((user) => {
        setState((prev) => ({ ...prev, isOpen: true, user, isLoading: false }));
      })
      .catch((error) => {
        console.error('사용자 정보 가져오기 오류:', error);
        setState((prev) => ({ ...prev, isLoading: false }));
      });
  };

  const resetState = () =>
    setState((prev) => ({ ...prev, isOpen: false, user: undefined }));

  const UserModal = () => {
    return (
      <UserModalComponent
        isOpen={state.isOpen}
        userDetail={state.user}
        onClose={resetState}
      />
    );
  };

  return { openUserModal, UserModal };
};

export default useUserModal;
