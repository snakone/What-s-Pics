export interface PostResponse {
  ok: boolean;
  message: string;
  page: number;
  posts: Post[];
}

export interface Post {
  _id: string;
  img?: string[];
  message: string;
  coords: string;
  user: User;
  created: string;
}

export interface User {
  _id: string;
  avatar?: string;
  name: string;
  email: string;
}
