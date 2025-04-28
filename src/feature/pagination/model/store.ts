import { create } from 'zustand';

interface PaginationStore {
  // 페이지당 항목 수
  limit: number;
  setLimit: (limit: number) => void;
  // 넘긴 페이지
  skip: number;
  setSkip: (skip: number) => void;
}
/**
 * 페이지네이션 스토어
 */
const usePaginationStore = create<PaginationStore>((set) => ({
  limit: 10,
  setLimit: (limit) => set({ limit }),
  skip: 0,
  setSkip: (skip) => set({ skip }),
}));

export default usePaginationStore;
