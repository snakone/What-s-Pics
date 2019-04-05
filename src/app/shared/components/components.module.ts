import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared.module';
import { PostCardComponent } from './post-card/post-card.component';
import { PostGridComponent } from './post-grid/post-grid.component';

@NgModule({
  declarations: [
    PostGridComponent,
    PostCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule
  ],
  exports: [
    PostGridComponent
  ]
})

export class ComponentsModule { }
