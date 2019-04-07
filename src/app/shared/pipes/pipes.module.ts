import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizerPipe } from './sanitizer/sanitizer.pipe';
import { AvatarPipe } from './avatar/avatar.pipe';

@NgModule({
  declarations: [
    SanitizerPipe,
    AvatarPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SanitizerPipe,
    AvatarPipe
  ]
})

export class PipesModule { }
