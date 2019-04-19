import { Component, OnInit, Input } from '@angular/core';
import { Post, FavoriteResponse, Favorite } from '@app/shared/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { UserService } from '@core/services/user/user.service';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss'],
})

export class UserFavoritesComponent implements OnInit {

  favorites: Favorite[];

  constructor(private modal: ModalController,
              private userService: UserService) { }

  ngOnInit() {
    this.getFavoritesByUser();
  }

  private getFavoritesByUser() {
    this.userService.getFavoritesByUser()
      .subscribe((res: FavoriteResponse) => {
        if (res.ok) { this.favorites = res.favorites; }
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

}
