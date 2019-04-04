import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '@shared/pipes/pipes.module';
import { NativeModule } from '@shared/native/native.module';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageModule } from '@app/core/language/language.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PipesModule,
    NativeModule,
    TranslateModule,
    LanguageModule,
  ],
  exports: [
    PipesModule,
    NativeModule,
    TranslateModule,
    LanguageModule
  ],
  providers: []
})

export class SharedModule { }
