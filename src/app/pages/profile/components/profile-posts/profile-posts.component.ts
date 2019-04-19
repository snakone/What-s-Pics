import { Component, OnInit, Input } from '@angular/core';
import { User, Post, PostResponse, FavoriteResponse } from '@app/shared/interfaces/interfaces';
import { UserService } from '@core/services/user/user.service';
import { PostService } from '@app/core/services/post/post.service';
import { NavController, ModalController } from '@ionic/angular';
import { StorageService } from '@app/core/storage/storage.service';
import { UserFavoritesComponent } from '@shared/components/modals/user-favorites/user-favorites.component';
import { UserPostsComponent } from '@shared/components/modals/user-posts/user-posts.component';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss'],
})

export class ProfilePostsComponent implements OnInit {

  @Input() likes: number;

  constructor(private userService: UserService,
              private postService: PostService,
              private nav: NavController,
              private storage: StorageService,
              private modal: ModalController) { }

  ngOnInit() {
  }

  async goFavorites() {
    const modal = await this.modal.create({
      component: UserFavoritesComponent
    });
    await modal.present();
  }

  async goPosts() {
    const modal = await this.modal.create({
      component: UserPostsComponent
    });
    await modal.present();
  }

  async logout() {
    await this.storage.clear();
    this.userService.logout();
    this.postService.resetPage();
    this.nav.navigateRoot('/login');
  }

}
