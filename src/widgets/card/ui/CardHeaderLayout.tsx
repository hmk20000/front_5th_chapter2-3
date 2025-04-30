import { Plus } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { CardHeader, CardTitle } from '../../../shared/ui';
import useAddPostModal from '../../../entities/post/hooks/useAddPostModal';

const CardHeaderLayout = () => {
  const { setIsOpen, AddPostModal } = useAddPostModal();
  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>게시물 관리자</span>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>

        {/* 게시물 추가 모달 */}
        <AddPostModal />
      </CardTitle>
    </CardHeader>
  );
};

export default CardHeaderLayout;
