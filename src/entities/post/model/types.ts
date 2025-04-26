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
