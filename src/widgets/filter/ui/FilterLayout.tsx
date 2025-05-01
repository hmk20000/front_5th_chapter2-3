import React, { useState } from 'react';
import { SelectItem } from '../../../shared/ui/Select';
import { SelectContent } from '../../../shared/ui/Select';
import { SelectTrigger } from '../../../shared/ui/Select';
import { SelectValue } from '../../../shared/ui/Select';
import SelectTags from '../../../entities/tags/ui/SelectTags';
import { Select } from '../../../shared/ui/Select';
import { Input } from '../../../shared/ui/Input';
import { Search } from 'lucide-react';
import { useFilter } from '../../../feature/filter/hooks/useFilter';

/**
 * 검색 및 필터 컨트롤 레이아웃
 */
const FilterLayout = () => {
  const [filter, updateURL] = useFilter();
  const [searchQuery, setSearchQuery] = useState(filter.search);

  const handleSearchEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = () => {
    updateURL({ ...filter, search: searchQuery });
  };

  const handleSortByChange = (value: string) => {
    updateURL({ ...filter, sortBy: value });
  };

  const handleSortOrderChange = (value: string) => {
    updateURL({ ...filter, sortOrder: value });
  };

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
            onKeyDown={handleSearchEvent}
            onBlur={handleSearch}
          />
        </div>
      </div>
      <SelectTags />
      <Select value={filter.sortBy} onValueChange={handleSortByChange}>
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
      <Select value={filter.sortOrder} onValueChange={handleSortOrderChange}>
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
