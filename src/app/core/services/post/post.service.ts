import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '@app/app.config';
import { PostResponse } from '@app/shared/interfaces/interfaces';

@Injectable()

export class PostService {

  public page = 0;

  readonly API_POST = APP_CONSTANTS.END_POINT + 'posts?page=';

  constructor(private http: HttpService) { }

  getPosts(): Observable<PostResponse> {
    this.page++;
    return this.http.get(this.API_POST + this.page);
  }

}
