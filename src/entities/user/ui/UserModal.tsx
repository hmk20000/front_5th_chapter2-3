import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../shared/ui/Dialog';
import { UserDetail } from '../model/types';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userDetail: UserDetail | undefined;
}

export const UserModal = ({ isOpen, onClose, userDetail }: UserModalProps) => {
  if (!userDetail) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <img
            src={userDetail.image}
            alt={userDetail.username}
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h3 className="text-xl font-semibold text-center">
            {userDetail.username}
          </h3>
          <div className="space-y-2">
            <p>
              <strong>이름:</strong> {userDetail.firstName}{' '}
              {userDetail.lastName}
            </p>
            <p>
              <strong>나이:</strong> {userDetail.age}
            </p>
            <p>
              <strong>이메일:</strong> {userDetail.email}
            </p>
            <p>
              <strong>전화번호:</strong> {userDetail.phone}
            </p>
            <p>
              <strong>주소:</strong> {userDetail.address.address},{' '}
              {userDetail.address.city}, {userDetail.address.state}
            </p>
            <p>
              <strong>직장:</strong> {userDetail.company.name} -{' '}
              {userDetail.company.title}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
