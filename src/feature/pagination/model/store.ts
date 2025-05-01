import { create } from 'zustand';

interface PaginationStore {
  // 총 항목 수
  total: number;
  setTotal: (total: number) => void;
}
/**
 * 페이지네이션 스토어
 */
const usePaginationStore = create<PaginationStore>((set) => ({
  total: 0,
  setTotal: (total) => set({ total }),
}));

export default usePaginationStore;
