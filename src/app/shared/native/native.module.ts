import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    Geolocation,
    Camera,
    File,
// tslint:disable-next-line: deprecation
    FileTransfer
  ]
})

export class NativeModule { }
