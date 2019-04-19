import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFavoritesComponent } from './user-favorites/user-favorites.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { IonicModule } from '@ionic/angular';
import { FavoriteCardComponent } from './user-favorites/components/favorite-card/favorite-card.component';
import { SharedModule } from '@app/shared/shared.module';
import { UserPostCardComponent } from './user-posts/components/user-post-card/user-post-card.component';

@NgModule({
  declarations: [
    UserPostsComponent,
    UserFavoritesComponent,
    FavoriteCardComponent,
    UserPostCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule
  ],
  exports: [
    UserPostsComponent,
    UserFavoritesComponent,
    FavoriteCardComponent,
    UserPostCardComponent
  ],
  entryComponents: [
    UserPostsComponent,
    UserFavoritesComponent
  ]
})

export class ModalsModule { }
