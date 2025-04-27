import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../shared/ui/Select';
import { useTag } from '../hooks/useTag';

interface SelectTagsProps {
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
}
const SelectTags = ({ selectedTag, setSelectedTag }: SelectTagsProps) => {
  const { data: tags } = useTag();

  return (
    <Select value={selectedTag} onValueChange={setSelectedTag}>
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
