export interface Post extends PostDTO {
  id: string;
  tags: string[];
  reactions: Reaction;
  views: number;
}

export interface PostDTO {
  title: string;
  body: string;
  userId: number;
}

export interface Reaction {
  likes: number;
  dislikes: number;
}
