import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from '@app/app.config';
import { HttpService } from '../http/http.service';
import { User, UserResponse} from '@app/shared/interfaces/interfaces';
import { StorageService } from '@app/core/storage/services/storage.service';
import { Observable } from 'rxjs';

@Injectable()

export class UserService {

  readonly API_USERS = APP_CONSTANTS.END_POINT + 'users';
  readonly API_TOKEN = APP_CONSTANTS.END_POINT + 'user';

  private user: User = <User>{};
  public token = '';

  constructor(private http: HttpService,
              private storage: StorageService) {
    console.log('UserService');
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
            console.log(err);
      }));
    });
  }

  getUser(): User {
    if (!this.user) { this.verifyToken(); }
    return { ...this.user };
  }

  updateUser(user: User): Observable<UserResponse> {
    return this.http.put(this.API_USERS, user);
  }

}
