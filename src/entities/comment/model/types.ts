export interface Comment {
  id: string;
  body: string;
  postId: string;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}
