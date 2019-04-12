import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared.module';
import { LoaderComponent } from './loader/loader.component';
import { PickAvatarComponent } from './pick-avatar/pick-avatar.component';
import { PipesModule } from '../pipes/pipes.module';
import { SettingsComponent } from './settings/settings/settings.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    LoaderComponent,
    PickAvatarComponent,
    SettingsComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    PipesModule,
    AgmCoreModule
  ],
  exports: [
    LoaderComponent,
    PickAvatarComponent,
    SettingsComponent,
    MapComponent
  ],
  entryComponents: [
    SettingsComponent,
    MapComponent
  ]
})

export class ComponentsModule { }
