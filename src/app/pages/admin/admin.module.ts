import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AdminPage } from './admin.page';
import { ComponentsModule } from '@app/shared/components/components.module';

const routes: Routes = [
  { path: '', component: AdminPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminPage]
})

export class AdminPageModule {}
