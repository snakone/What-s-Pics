import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable, Subject } from 'rxjs';
import { APP_CONSTANTS } from '@app/app.config';
import { PostResponse, Post, DeletePostResponse } from '@app/shared/interfaces/interfaces';
import { map } from 'rxjs/operators';

@Injectable()

export class PostService {

  public page = 0;
  readonly API_POST = APP_CONSTANTS.END_POINT + 'posts';
  readonly API_POST_USER = APP_CONSTANTS.END_POINT + 'posts/user';
  readonly API_POST_LIKES = APP_CONSTANTS.END_POINT + 'posts/likes';
  stream: Subject<Post> = new Subject<Post>();
  deleteStream: Subject<string> = new Subject<string>();

  constructor(private http: HttpService) {
    console.log('PostService');
   }

  public getPosts(): Observable<PostResponse> {
    this.page++;
    return this.http.get(this.API_POST + '?page=' + this.page);
  }

  public getAllPosts(): Observable<PostResponse> {
    return this.http.get(this.API_POST + '/all');
  }

  public createPost(post: Post): Observable<PostResponse> {
    return this.http.post(this.API_POST, post);
  }

  public deletePost(id: string): Observable<DeletePostResponse> {
    return this.http.delete(this.API_POST + '/' + id);
  }

  public getPostByUser(): Observable<PostResponse> {
    this.page++;
    return this.http.get(this.API_POST_USER + '?page=' + this.page);
  }

  public getTotalLikes(): Observable<number> {
    return this.http.get(this.API_POST_LIKES)
      .pipe(map((res: PostResponse) => {
        let total = 0;
        res.posts.map(x => {
          total += x.likes;
        });
        return total;
      }));
  }

  public streamPost(post: Post): void {
    this.stream.next(post);
  }

  public resetPage(): void {
    this.page = 0;
  }

}
