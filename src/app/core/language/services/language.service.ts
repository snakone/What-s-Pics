import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from '@app/app.config';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '@app/core/storage/storage.service';

@Injectable()

export class LanguageService {

  constructor(private translateService: TranslateService,
              private storage: StorageService,
    @Inject(APP_CONFIG) private appConfig: AppConfig) {
    this.setDefault();
    this.loadStorageLanguage();
    console.log('LanguageService');
  }

  private setDefault(): void {
    if (!this.translateService.getDefaultLang()) {
      this.translateService.setDefaultLang(this.appConfig.DEFAULT_LANGUAGE);
    }
    this.translateService.use(this.appConfig.DEFAULT_LANGUAGE);
  }

  public change(lang: string): void {
    this.translateService.use(lang);
  }

  public getCurrent(): string {
    return this.translateService.currentLang;
  }

  private loadStorageLanguage(): void {
    const language = this.storage.getLanguage();
    if (language) {
      this.translateService.use(language);
    }
  }
}
