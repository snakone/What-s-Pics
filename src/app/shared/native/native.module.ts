import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    Geolocation
  ]
})

export class NativeModule { }
