import { Button } from '../../../shared/ui/Button';
import SelectLimit from '../../../feature/pagination/ui/SelectLimit';
import usePaginationStore from '../../../feature/pagination/model/store';

interface PaginationLayoutProps {
  skip: number;
  setSkip: (skip: number) => void;
  total: number;
}
/**
 * 페이지네이션 레이아웃
 * @param limit 페이지당 항목 수
 * @param setLimit 페이지당 항목 수 설정
 * @param skip 페이지 번호
 * @param setSkip 페이지 번호 설정
 * @param total 총 항목 수
 */
const PaginationLayout = ({ skip, setSkip, total }: PaginationLayoutProps) => {
  const { limit } = usePaginationStore();
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
