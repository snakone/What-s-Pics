import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { ErrorHandlerService } from '@core/error-handler/error-handler.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageModule } from '@core/language/language.module';
import { CORE_MODULE_CONSTANTS, CORE_MODULE_CONFIG } from '@core/core.module.config';
import { LanguageService } from '@core/language/services/language.service';
import { ServicesModule } from '@core/services/services.module';
import { StorageModule } from '@core/storage/storage.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, CORE_MODULE_CONSTANTS.TRANSLATE_CONFIG.I18N_PATH,
                                 CORE_MODULE_CONSTANTS.TRANSLATE_CONFIG.SUFFIX_FILE);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ServicesModule,
    StorageModule,
    IonicStorageModule.forRoot(),
    LanguageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [],
  providers: [
    LanguageService,
    { provide: CORE_MODULE_CONFIG, useValue: CORE_MODULE_CONSTANTS },
    { provide: ErrorHandler, useClass: ErrorHandlerService }
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
