import { Button } from '../../../shared/ui/Button';
import SelectLimit from '../../../feature/pagination/ui/SelectLimit';
import usePaginationStore from '../../../feature/pagination/model/store';
import { useFilter } from '../../../feature/filter/hooks/useFilter';
/**
 * 페이지네이션 레이아웃
 * @param total 총 항목 수
 */
const PaginationLayout = () => {
  const { total } = usePaginationStore();
  const [filter, updateURL] = useFilter();
  const { skip, limit } = filter;
  return (
    <div className="flex justify-between items-center">
      <SelectLimit />
      <div className="flex gap-2">
        <Button
          disabled={skip === 0}
          onClick={() =>
            updateURL({ ...filter, skip: Math.max(0, skip - limit) })
          }
        >
          이전
        </Button>
        <Button
          disabled={skip + limit >= total}
          onClick={() => updateURL({ ...filter, skip: skip + limit })}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default PaginationLayout;
