// 태그 선택 스토어 타입

export interface SelectTagsState {
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
}
