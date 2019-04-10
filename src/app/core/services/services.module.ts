import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService,
         PostService,
         LoginService,
         UserService,
         CameraService } from './services.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    HttpService,
    PostService,
    LoginService,
    UserService,
    CameraService
  ]
})

export class ServicesModule { }
