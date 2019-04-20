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
  readonly API_POST_LIKES = APP_CONSTANTS.END_POINT + 'posts/likes';
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
    this.page++;
    return this.http.get(this.API_POST_USER + '?page=' + this.page);
  }

  getTotalLikes(): Observable<number> {
    return this.http.get(this.API_POST_LIKES)
      .pipe(map((res: PostResponse) => {
        let total = 0;
        res.posts.map(x => {
          total += x.likes;
        });
        return total;
      }));
  }

  streamPost(post: Post) {
    this.stream.next(post);
  }

  resetPage(): void {
    this.page = 0;
  }

}
