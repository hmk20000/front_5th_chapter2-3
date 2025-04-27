import { useEffect, useState } from 'react';
import fetchTag from '../api/fetchTag';
import { Tag } from '../model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../shared/ui/Select';

interface SelectTagsProps {
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
}
const SelectTags = ({ selectedTag, setSelectedTag }: SelectTagsProps) => {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    fetchTag().then((tags) => {
      setTags(tags);
    });
  }, []);

  return (
    <Select value={selectedTag} onValueChange={setSelectedTag}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectTags;
