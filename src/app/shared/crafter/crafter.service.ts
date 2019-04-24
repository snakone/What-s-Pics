import { Injectable } from '@angular/core';
import {
  AlertController,
  ToastController,
  PopoverController,
  ModalController
} from '@ionic/angular';
import { SettingsComponent } from '@shared/components/settings/settings.component';
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

  public close(): void {
    this.popOverCtrl.dismiss();
  }

  public async alert(message: string): Promise<void> {
    message = this.translateMessage(message);
    const alert = await this.alertCtrl.create({
      header: 'What\'s Pics',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  public async toast(message: string): Promise<void> {
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

  public async popOver(ev: any): Promise<void> {
    const popover = await this.popOverCtrl.create({
      component: SettingsComponent,
      event: ev,
      translucent: true,
      mode: 'md'
    });
    await popover.present();
  }

  public async modal(component: ComponentRef, data?: any): Promise<void> {
    if (this.modalCtrl.getTop()) { return; }
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
