import { Injectable } from '@angular/core';
import { AlertController, ToastController, PopoverController } from '@ionic/angular';
import { SettingsComponent } from '../components/settings/settings/settings.component';
import { TranslateService } from '@ngx-translate/core';

@Injectable()

export class CrafterService {

    constructor(private alertCtrl: AlertController,
                private toastCtrl: ToastController,
                private popOverCtrl: PopoverController,
                private translate: TranslateService) {
      console.log('CrafterService');
  }

  public close() {
    this.popOverCtrl.dismiss();
  }

  public async alert(message: string) {
    message = this.translateMessage(message);
    const alert = await this.alertCtrl.create({
      header: 'What The Pics',
      message,
      buttons: ['OK']
    });
    alert.present();
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
    toast.present();
  }

  public async popOver(ev: any) {
    const popover = await this.popOverCtrl.create({
      component: SettingsComponent,
      event: ev,
      translucent: true,
      mode: 'md'
    });
    return await popover.present();
  }

  private translateMessage(msg: string): string {
    const message = this.translate.instant(msg);
    return message;
  }

}
