import { Injectable } from '@angular/core';
import {
  AlertController,
  ToastController,
  PopoverController,
  ModalController
} from '@ionic/angular';
import { SettingsComponent } from '../components/settings/settings.component';
import { TranslateService } from '@ngx-translate/core';
import { ComponentRef } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})

export class CrafterService {

    constructor(private alertCtrl: AlertController,
                private toastCtrl: ToastController,
                private popOverCtrl: PopoverController,
                private translate: TranslateService,
                private modalCtrl: ModalController) {
      console.log('CrafterService');
  }

  public close() {
    this.popOverCtrl.dismiss();
  }

  public async alert(message: string) {
    message = this.translateMessage(message);
    const alert = await this.alertCtrl.create({
      header: 'What\'s Pics',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  public async toast(message: string) {
    message = this.translateMessage(message);
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      color: 'light',
      position: 'top',
      cssClass: 'toast-sheet'
    });
    await toast.present();
  }

  public async popOver(ev: any) {
    const popover = await this.popOverCtrl.create({
      component: SettingsComponent,
      event: ev,
      translucent: true,
      mode: 'md'
    });
    await popover.present();
  }

  public async modal(component: ComponentRef, data?: any) {
    if (this.modalCtrl.getTop()) { return; }
    console.log(data);
    const modal = await this.modalCtrl.create({
      component,
      componentProps: data
    });
    return await modal.present();
  }

  private translateMessage(msg: string): string {
    const message = this.translate.instant(msg);
    return message;
  }

}
