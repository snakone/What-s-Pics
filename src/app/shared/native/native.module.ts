import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    Geolocation,
    Camera,
    File
  ]
})

export class NativeModule { }
