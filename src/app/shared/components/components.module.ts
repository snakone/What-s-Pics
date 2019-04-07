import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared.module';
import { LoaderComponent } from './loader/loader.component';
import { PickAvatarComponent } from './pick-avatar/pick-avatar.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    LoaderComponent,
    PickAvatarComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    PipesModule
  ],
  exports: [
    LoaderComponent,
    PickAvatarComponent
  ]
})

export class ComponentsModule { }
