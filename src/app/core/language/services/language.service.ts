import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from '@app/app.config';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Injectable()

export class LanguageService {

  constructor(private translateService: TranslateService,
              private storage: Storage,
    @Inject(APP_CONFIG) private appConfig: AppConfig) {
    this.setDefault();
    this.loadStorageLanguage();
  }

  private setDefault() {
    if (!this.translateService.getDefaultLang()) {
      this.translateService.setDefaultLang(this.appConfig.DEFAULT_LANGUAGE);
    }
    this.translateService.use(this.appConfig.DEFAULT_LANGUAGE);
  }

  public change(lang: string) {
    this.translateService.use(lang);
  }

  public getCurrent(): string {
    return this.translateService.currentLang;
  }

  private async loadStorageLanguage() {
    const language = await this.storage.get('language');
    if (language) {
      this.translateService.use(language);
    }
  }
}
