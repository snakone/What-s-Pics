import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(private user: UserService,
              private nav: NavController) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.user.getUser();
    if (user.account === 'Admin') {
      return true;
    } else {
      this.nav.navigateRoot('/');
      console.log('Blocked');
      return false;
    }
  }
}
