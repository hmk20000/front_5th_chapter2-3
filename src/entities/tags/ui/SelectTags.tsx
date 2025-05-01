import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../shared/ui/Select';
import { useTag } from '../hooks/useTag';
import { useFilter } from '../../../feature/filter/hooks/useFilter';

const SelectTags = () => {
  const { data: tags } = useTag();
  // const { selectedTag, setSelectedTag } = useSelectedTags();

  const [filter, updateURL] = useFilter();

  const handleTagChange = (tag: string) => {
    updateURL({ ...filter, tag });
  };

  return (
    <Select value={filter.tag} onValueChange={handleTagChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags?.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectTags;
