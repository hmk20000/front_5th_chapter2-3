import { SelectContent } from '../../../shared/ui/Select';
import { SelectValue } from '../../../shared/ui/Select';
import { SelectTrigger } from '../../../shared/ui/Select';
import { SelectItem } from '../../../shared/ui/Select';
import { Select } from '../../../shared/ui/Select';
import { useFilter } from '../../filter/hooks/useFilter';

const LIMIT_OPTIONS = [10, 20, 30];

/**
 * 페이지당 항목 수 선택 컴포넌트
 * @param limit 페이지당 항목 수
 * @param setLimit 페이지당 항목 수 설정
 * @returns
 */
const SelectLimit = () => {
  const [filter, updateURL] = useFilter();
  const { limit } = filter;
  return (
    <div className="flex items-center gap-2">
      <span>표시</span>
      <Select
        value={limit.toString()}
        onValueChange={(value) =>
          updateURL({ ...filter, limit: Number(value) })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="10" />
        </SelectTrigger>
        <SelectContent>
          {LIMIT_OPTIONS.map((option) => (
            <SelectItem key={option} value={option.toString()}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span>항목</span>
    </div>
  );
};

export default SelectLimit;
