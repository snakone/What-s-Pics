import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizerPipe } from './sanitizer/sanitizer.pipe';
import { AvatarPipe } from './avatar/avatar.pipe';
import { S3ImagePipe } from './s3-image/s3-image.pipe';

@NgModule({
  declarations: [
    SanitizerPipe,
    AvatarPipe,
    S3ImagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SanitizerPipe,
    AvatarPipe,
    S3ImagePipe
  ]
})

export class PipesModule { }
