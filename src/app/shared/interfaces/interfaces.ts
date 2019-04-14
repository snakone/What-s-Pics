import { STORAGE_CONSTANTS } from '@app/core/storage/storage.config';

export interface PostResponse {
  ok: boolean;
  message: string;
  page?: number;
  posts?: Post[];
  post?: Post;
}

export interface UserResponse {
  ok: boolean;
  message: string;
  user: User;
  token?: string;
}

export interface FileResponse {
  name: string;
  image: string;
  size: number;
}

export interface Post {
  _id?: string;
  images?: string[];
  message?: string;
  coords?: string;
  user?: User;
  created?: string;
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
  lang?: string;
  posts?: Post[];
  token?: string;
  tutorial?: boolean;
  remember?: boolean;

  constructor(token: string = STORAGE_CONSTANTS.TOKEN,
              lang: string = STORAGE_CONSTANTS.LANGUAGE,
              tutorial: boolean = STORAGE_CONSTANTS.TUTORIAL,
              remember: boolean = true
              ) {
    this.token = token;
    this.lang = lang;
    this.tutorial = tutorial;
    this.remember = remember;
  }
}
