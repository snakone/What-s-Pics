import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { APP_CONSTANTS } from '@app/app.config';
import { HttpService } from '../http/http.service';
import { User, UserResponse} from '@app/shared/interfaces/interfaces';

@Injectable()

export class UserService {

  readonly API_USERS = APP_CONSTANTS.END_POINT + 'users';
  readonly API_TOKEN = APP_CONSTANTS.END_POINT + 'user';

  private user: User = <User>{};
  public token = '';

  constructor(private http: HttpService,
              private storage: StorageService) {
    console.log('UserService');
    this.token = this.storage.getToken();
    }

  public verifyToken(): Promise<boolean> {
    if (!this.token) { return Promise.resolve(false); }
    return new Promise<boolean>((resolve, rej) => {
      this.http.get(this.API_TOKEN)
        .subscribe((res: UserResponse) => {
          if (res.ok) {
            this.user = res.user;
            resolve(true);
          } else { resolve(false); }
      });
    });
  }

  getUser(): User {
    if (!this.user) { this.verifyToken(); }
    return { ...this.user };
  }

  updateUser(user: User) {
    return this.http.put(this.API_USERS, user);
  }

}
