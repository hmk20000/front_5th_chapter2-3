import { create } from 'zustand';
import { SelectTagsState } from './types';

/**
 * 태그 선택 스토어
 */
export const useSelectTagsStore = create<SelectTagsState>((set) => ({
  selectedTag: '',
  setSelectedTag: (tag) => set({ selectedTag: tag }),
}));
