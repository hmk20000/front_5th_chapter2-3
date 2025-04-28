import { create } from 'zustand';
import { PostWithUser } from './types';

interface PostsWithUserStore {
  posts: PostWithUser[];
  setPosts: (posts: PostWithUser[]) => void;
}

const usePostsWithUserStore = create<PostsWithUserStore>((set) => ({
  posts: [],
  setPosts: (posts: PostWithUser[]) => set({ posts }),
}));

export default usePostsWithUserStore;
