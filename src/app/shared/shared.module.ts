import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '@shared/pipes/pipes.module';
import { NativeModule } from '@shared/native/native.module';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageModule } from '@app/core/language/language.module';
import { CrafterService } from './crafter/crafter.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PipesModule,
    NativeModule,
    TranslateModule,
    LanguageModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PipesModule,
    NativeModule,
    TranslateModule,
    LanguageModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CrafterService
  ]
})

export class SharedModule { }
