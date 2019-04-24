import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from '@app/app.config';
import { HttpService } from '../http/http.service';
import { User, UserResponse, FavoriteResponse} from '@app/shared/interfaces/interfaces';
import { StorageService } from '@app/core/storage/storage.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { LikeResponse } from '@shared/interfaces/interfaces';

@Injectable()

export class UserService {

  readonly API_USERS = APP_CONSTANTS.END_POINT + 'users';
  readonly API_TOKEN = APP_CONSTANTS.END_POINT + 'user';
  readonly API_FAVORITES = APP_CONSTANTS.END_POINT + 'favorites';
  readonly API_LIKES = APP_CONSTANTS.END_POINT + 'likes';

  private user: User;
  public token = '';
  public page = 0;

  constructor(private http: HttpService,
              private storage: StorageService) {
      console.log('UserService');
    }

  public getUser(): User {
    if (!this.user) { this.verifyToken(); }
    return { ...this.user };
  }

  public loadUser(): Promise<void> {
    return new Promise((resolve, rej) => {
      const id = this.storage.getId();
      if (id) {
        this.getUserById(id)
          .subscribe((res: UserResponse) => {
            if (res.ok) {
              this.user = res.user;
              resolve();
            }
        });
      } else { rej(); }
    });
  }

  public getUserById(id: string): Observable<UserResponse> {
    return this.http.get(this.API_TOKEN + `/${id}`);
  }

  public updateUser(user: User): Observable<UserResponse> {
    return this.http.put(this.API_USERS, user);
  }

  public addFavorite(id: string): Observable<FavoriteResponse> {
    return this.http.post(this.API_FAVORITES, { id });
  }

  public getFavoritesByUser(): Observable<FavoriteResponse> {
    this.page++;
    return this.http.get(this.API_FAVORITES + '?page=' + this.page);
  }

  public removeFavorite(id: string): Observable<FavoriteResponse> {
    return this.http.delete(this.API_FAVORITES, null, new HttpParams().set('id', id));
  }

  public doLike(id: string): Observable<LikeResponse> {
    return this.http.post(this.API_LIKES, { id });
  }

  public refreshToken(): Observable<UserResponse> {
    if (!this.user) {
      this.loadUser();
      return;
    }
    return this.http.post(this.API_TOKEN + '/token', this.user);
  }

  public setUser(user: User): void {
    this.user = user;
  }

  public deleteUser(): Observable<UserResponse> {
    return this.http.delete(this.API_USERS);
  }

  public logout(): void {
    this.user = null;
  }

  public verifyToken(): Promise<boolean> {
    if (!this.storage.getToken()) { return Promise.resolve(false); }
    return new Promise<boolean>((resolve, rej) => {
      this.http.get(this.API_TOKEN)
        .subscribe((res: UserResponse) => {
          if (res.ok) {
            this.user = res.user;
            this.storage.setId(res.user._id);
            resolve(true);
          }
        }, (err => {
            resolve(false);
      }));
    });
  }

  public resetPage(): void {
    this.page = 0;
  }

}
