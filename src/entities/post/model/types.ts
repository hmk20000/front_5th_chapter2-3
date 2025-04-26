export type Post = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
};

type Reaction = {
  like: number;
  dislike: number;
};

export type User = {
  id: number;
  username: string;
  image: string;
};
