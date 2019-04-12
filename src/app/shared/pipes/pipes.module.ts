import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizerPipe } from './sanitizer/sanitizer.pipe';
import { AvatarPipe } from './avatar/avatar.pipe';
import { ImagesPipe } from './images/images.pipe';

@NgModule({
  declarations: [
    SanitizerPipe,
    AvatarPipe,
    ImagesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SanitizerPipe,
    AvatarPipe,
    ImagesPipe
  ]
})

export class PipesModule { }
