import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddPage } from './add.page';
import { PostFormComponent } from './components/post-form/post-form.component';
import { SharedModule } from '@app/shared/shared.module';
import { PostImagesComponent } from './components/post-images/post-images.component';

const routes: Routes = [
  { path: '', component: AddPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AddPage,
    PostFormComponent,
    PostImagesComponent
  ]
})

export class AddPageModule {}
