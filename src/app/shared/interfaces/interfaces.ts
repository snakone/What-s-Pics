export interface PostResponse {
  ok: boolean;
  message: string;
  page: number;
  posts: Post[];
}

export interface UserResponse {
  ok: boolean;
  message: string;
  user: User;
  token?: string;
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
  _id?: string;
  avatar?: string;
  name: string;
  email: string;
  password: string;
}

export class AppStorage {
  id?: string;
  language?: string;
  posts?: Post[];
  token?: string;

  constructor(token: string = '') {
    this.token = token;
  }
}
