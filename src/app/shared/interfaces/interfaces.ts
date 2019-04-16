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

export interface FavoriteResponse {
  ok: boolean;
  message: string;
  favorites: Favorite[];
  page?: number;
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
  likes?: number;
}

export interface User {
  _id?: string;
  avatar?: string;
  name: string;
  email: string;
  password: string;
}

export interface Favorite {
  user: User;
  post: Post;
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

export interface FAQ {
  question: string;
  answer: string;
  collapsed: boolean;
  arrow: string;
}

export const SLIDES_OPTIONS: any = {
  effect: 'flip',
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  zoom: false
 };
