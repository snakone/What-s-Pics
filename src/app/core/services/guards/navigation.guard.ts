import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { UserService } from '../user/user.service';
import { StorageService } from '@app/core/storage/services/storage.service';

@Injectable({
  providedIn: 'root'
})

export class NavigationGuard implements CanActivate {

  constructor(private user: UserService,
              private nav: NavController,
              private storage: StorageService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.user.verifyToken()
      .then(async (res) => {
        if (!res) {
          await this.storage.removeToken();
          this.nav.navigateRoot('/login');
        }
      return res;
    });
  }

}
