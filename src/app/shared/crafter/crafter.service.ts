import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()

export class CrafterService {

  constructor(private alertCtrl: AlertController) {
    console.log('CrafterService');
   }

  public async alert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'What The Pics',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
