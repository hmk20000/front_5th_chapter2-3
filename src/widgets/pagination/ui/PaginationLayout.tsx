import { Button } from '../../../shared/ui/Button';
import SelectLimit from '../../../feature/pagination/ui/SelectLimit';
import usePaginationStore from '../../../feature/pagination/model/store';

interface PaginationLayoutProps {
  total: number;
}
/**
 * 페이지네이션 레이아웃
 * @param total 총 항목 수
 */
const PaginationLayout = ({ total }: PaginationLayoutProps) => {
  const { limit, skip, setSkip } = usePaginationStore();
  return (
    <div className="flex justify-between items-center">
      <SelectLimit />
      <div className="flex gap-2">
        <Button
          disabled={skip === 0}
          onClick={() => setSkip(Math.max(0, skip - limit))}
        >
          이전
        </Button>
        <Button
          disabled={skip + limit >= total}
          onClick={() => setSkip(skip + limit)}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default PaginationLayout;
