export interface Comment {
  id: string;
  body: string;
  postId: string | null;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}
