//selectedPost store
import { create } from 'zustand';
import { Post } from '../../../entities/post/model/types';

interface SelectedPostStore {
  selectedPost?: Post;
  setSelectedPost: (post: Post) => void;
}

export const useSelectedPostStore = create<SelectedPostStore>((set) => ({
  selectedPost: undefined,
  setSelectedPost: (post) => set({ selectedPost: post }),
}));
