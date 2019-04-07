import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {

  constructor(private storage: StorageService,
              private nav: NavController) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.storage.getToken()) { return true; }
    console.log('No need Login when you are already logged!');
    this.nav.navigateRoot('tabs/home');
    return false;
  }

}