import { Component, OnInit } from '@angular/core';
import { FavoriteResponse, Favorite } from '@app/shared/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { UserService } from '@core/services/user/user.service';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss'],
})

export class UserFavoritesComponent implements OnInit {

  favorites: Favorite[];
  scroll = true;

  constructor(private modal: ModalController,
              private user: UserService) { }

  ngOnInit() {
    this.user.resetPage();
    this.getFavoritesByUser();
  }

  private getFavoritesByUser(event?: any): void {
    this.user.getFavoritesByUser()
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

  remove(id: string): void {
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
