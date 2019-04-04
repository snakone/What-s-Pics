import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(private translate: TranslateService,
      private storage: Storage) {}

  setLanguage(lang: string): void {
    this.translate.use(lang);
    this.storage.set('language', lang);
  }
}
