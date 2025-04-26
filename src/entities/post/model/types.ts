export interface Post {
  id: string;
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
}

export interface Reaction {
  likes: number;
  dislikes: number;
}
