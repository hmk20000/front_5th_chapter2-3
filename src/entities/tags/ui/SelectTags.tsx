import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../shared/ui/Select';
import { useTag } from '../hooks/useTag';
import useSelectedTags from '../../../feature/selectTags/hooks/useSelectedTags';

interface SelectTagsProps {
  onTagChange: (tag: string) => void;
}
const SelectTags = ({ onTagChange }: SelectTagsProps) => {
  const { data: tags } = useTag();
  const { selectedTag, setSelectedTag } = useSelectedTags();

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    onTagChange(tag);
  };

  return (
    <Select value={selectedTag} onValueChange={handleTagChange}>
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
