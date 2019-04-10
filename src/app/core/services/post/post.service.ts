import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable, Subject } from 'rxjs';
import { APP_CONSTANTS } from '@app/app.config';
import { PostResponse, Post } from '@app/shared/interfaces/interfaces';

@Injectable()

export class PostService {

  public page = 0;
  readonly API_POST = APP_CONSTANTS.END_POINT + 'posts';
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

  streamPost(post: Post) {
    this.stream.next(post);
  }

}
