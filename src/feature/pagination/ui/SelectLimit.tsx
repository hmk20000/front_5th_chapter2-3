import { SelectContent } from '../../../shared/ui/Select';
import { SelectValue } from '../../../shared/ui/Select';
import { SelectTrigger } from '../../../shared/ui/Select';
import { SelectItem } from '../../../shared/ui/Select';
import { Select } from '../../../shared/ui/Select';
import usePaginationStore from '../model/store';

/**
 * 페이지당 항목 수 선택 컴포넌트
 * @param limit 페이지당 항목 수
 * @param setLimit 페이지당 항목 수 설정
 * @returns
 */
const SelectLimit = () => {
  const { limit, setLimit } = usePaginationStore();
  return (
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
  );
};

export default SelectLimit;
