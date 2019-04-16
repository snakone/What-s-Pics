import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable, Subject } from 'rxjs';
import { APP_CONSTANTS } from '@app/app.config';
import { PostResponse, Post } from '@app/shared/interfaces/interfaces';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()

export class PostService {

  public page = 0;
  readonly API_POST = APP_CONSTANTS.END_POINT + 'posts';
  readonly API_POST_USER = APP_CONSTANTS.END_POINT + 'posts/user';
  stream: Subject<Post> = new Subject<Post>();

  constructor(private http: HttpService) {
    console.log('PostService');
   }

  getPosts(): Observable<PostResponse> {
    this.page++;
    return this.http.get(this.API_POST + '?page=' + this.page);
  }

  createPost(post: Post): Observable<PostResponse> {
    return this.http.post(this.API_POST, post);
  }

  getPostByUser(): Observable<PostResponse> {
    return this.http.get(this.API_POST_USER);
  }

  streamPost(post: Post) {
    this.stream.next(post);
  }

  resetPage(): void {
    this.page = 0;
  }

}
