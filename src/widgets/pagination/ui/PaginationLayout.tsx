import { SelectContent } from '../../../shared/ui/Select';
import { SelectValue } from '../../../shared/ui/Select';
import { SelectTrigger } from '../../../shared/ui/Select';
import { SelectItem } from '../../../shared/ui/Select';
import { Select } from '../../../shared/ui/Select';
import { Button } from '../../../shared/ui/Button';

interface PaginationLayoutProps {
  limit: number;
  setLimit: (limit: number) => void;
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
const PaginationLayout = ({
  limit,
  setLimit,
  skip,
  setSkip,
  total,
}: PaginationLayoutProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select
          value={limit.toString()}
          onValueChange={(value) => setLimit(Number(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
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
