import { create } from 'zustand';
import { Comment } from './types';

interface CommentStore {
  comments: Record<string, Comment[]>;
  setComments: (comments: Record<string, Comment[]>) => void;
}

export const useCommentStore = create<CommentStore>((set) => ({
  comments: {},
  setComments: (comments: Record<string, Comment[]>) => set({ comments }),
}));
