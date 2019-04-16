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

  @Input() user: User;
  favorites: Post[] = [];
  posts: Post[] = [];
  likes: number;

  constructor(private userService: UserService,
              private postService: PostService,
              private nav: NavController,
              private storage: StorageService,
              private modal: ModalController) { }

  ngOnInit() {
    this.getFavoritesByUser();
    this.getPostByUser();
  }

  private getFavoritesByUser() {
    this.userService.getFavoritesByUser()
      .subscribe((res: FavoriteResponse) => {
        if (res.ok) {
          this.favorites = res.favorites.map(x => x.post);
        }
      });
  }

  private getPostByUser() {
    this.postService.getPostByUser()
      .subscribe((res: PostResponse) => {
        if (res.ok) {
          this.posts = res.posts;
          this.getTotalLikes(this.posts);
        }
      });
  }

  async goFavorites() {
    const modal = await this.modal.create({
      component: UserFavoritesComponent,
      componentProps: { favorites: this.favorites }
    });
    await modal.present();
  }

  async goPosts() {
    const modal = await this.modal.create({
      component: UserPostsComponent,
      componentProps: { posts: this.posts }
    });
    await modal.present();
  }

  async logout() {
    await this.storage.clear();
    this.userService.logout();
    this.postService.resetPage();
    this.nav.navigateRoot('/login');
  }

  private getTotalLikes(posts: Post[]): number {
    let total = 0;
    posts.map(post => {
      return total += post.likes;
    });
    return this.likes = total;
  }

}
