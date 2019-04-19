import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { StorageService } from '../../storage/storage.service';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private nav: NavController,
              private user: UserService,
              private storage: StorageService) {
    console.log('JwtInterceptor');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(((res: HttpResponse<any>) => {
    }), ((error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.user.loadUser().then(() => {
          this.user.refreshToken()
          .subscribe(res => {
            if (!res.ok) {
              this.nav.navigateRoot('/login');
              return throwError(error);
            }
            this.storage.setToken(res.token);
            this.nav.navigateRoot('/');
          });
        }).catch(() => {
          this.nav.navigateRoot('/login');
          return throwError(error);
        });
      } else { return throwError(error); }
    })));
  }
}
