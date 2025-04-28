import React from 'react';
import { SelectItem } from '../../../shared/ui/Select';
import { SelectContent } from '../../../shared/ui/Select';
import { SelectTrigger } from '../../../shared/ui/Select';
import { SelectValue } from '../../../shared/ui/Select';
import SelectTags from '../../../entities/tags/ui/SelectTags';
import { Select } from '../../../shared/ui/Select';
import { Input } from '../../../shared/ui/Input';
import { Search } from 'lucide-react';

interface FilterLayoutProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchPosts: () => void;
  handleTagChange: (tag: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortOrder: string;
  setSortOrder: (sortOrder: string) => void;
}

/**
 * 검색 및 필터 컨트롤 레이아웃
 */
const FilterLayout = ({
  searchQuery,
  setSearchQuery,
  searchPosts,
  handleTagChange,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: FilterLayoutProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchPosts()}
          />
        </div>
      </div>
      <SelectTags onTagChange={handleTagChange} />
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sortOrder} onValueChange={setSortOrder}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterLayout;
