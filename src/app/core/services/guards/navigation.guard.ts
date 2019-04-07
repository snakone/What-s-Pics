import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})

export class NavigationGuard implements CanActivate {

  constructor(private user: UserService,
              private nav: NavController) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.user.verifyToken()
      .then(res => {
        if (!res) {
          this.nav.navigateRoot('/login');
        }
      return res;
    });
  }

}
