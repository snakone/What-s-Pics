import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AppStorage } from '@app/shared/interfaces/interfaces';
import { StorageService } from '@app/core/storage/services/storage.service';
import { LanguageOpts, SettingsOpts, TutorialOpts } from './settings.data';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})

export class SettingsComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  settings: AppStorage;

  language: SettingsOpts[] = LanguageOpts;
  tutorial: SettingsOpts[] = TutorialOpts;

  constructor(private popOver: PopoverController,
              private storage: StorageService,
              private toastCtrl: ToastController,
              private translate: TranslateService) { }

  ngOnInit() {
    this.settings = this.storage.get();
  }

  async onSubmit(settingsForm: NgForm) {
    const l: string = settingsForm.value.language;
    const t: boolean = settingsForm.value.tutorial;
    await this.handler(l, t) ? this.toast('settings.saved') :
    this.toast('settings.error');
    this.popOver.dismiss();
  }

  private handler(l: string, t: boolean): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      try {
        this.storage.save('lang', l);
        this.storage.save('tutorial', t);
        this.translate.use(l);
        res(true);
      } catch (err) {
        res(false);
        console.log(err);
      }
    });
  }

  private async toast(message: string) {
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

  private translateMessage(msg: string): string {
    const message = this.translate.instant(msg);
    return message;
  }

}
