import { Component, OnInit, Input } from '@angular/core';
import { Post, FavoriteResponse, Favorite } from '@app/shared/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { UserService } from '@core/services/user/user.service';
import { PostService } from '../../../../core/services/post/post.service';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss'],
})

export class UserFavoritesComponent implements OnInit {

  favorites: Favorite[];
  scroll = true;

  constructor(private modal: ModalController,
              private userService: UserService,
              private postService: PostService) { }

  ngOnInit() {
    this.userService.resetPage();
    this.getFavoritesByUser();
  }

  private getFavoritesByUser(event?: any) {
    this.userService.getFavoritesByUser()
      .subscribe((res: FavoriteResponse) => {
        if (res.ok) {
          if (!this.favorites) { this.favorites = []; }
          this.favorites.push(...res.favorites);
          if (event) { event.target.complete(); }
          if (event && res.favorites.length === 0) {
            this.scroll = false;
          }
        }
      });
  }

  remove(id: string) {
    this.favorites = this.favorites.filter(x => {
      return x._id !== id;
    });
  }

  close(): void {
    this.modal.dismiss();
  }

  onScroll(event: any): void {
    this.getFavoritesByUser(event);
  }

}
