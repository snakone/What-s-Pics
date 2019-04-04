import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs.router.module';
import { TabsPage } from './tabs.page';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})

export class TabsPageModule {}
