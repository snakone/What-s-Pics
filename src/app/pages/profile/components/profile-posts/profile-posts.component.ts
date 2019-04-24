import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { PostService } from '@app/core/services/post/post.service';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { StorageService } from '@app/core/storage/storage.service';
import { UserFavoritesComponent } from '@shared/components/modals/user-favorites/user-favorites.component';
import { UserPostsComponent } from '@shared/components/modals/user-posts/user-posts.component';
import { TranslateService } from '@ngx-translate/core';
import { CrafterService } from '@app/shared/crafter/crafter.service';
import { UserResponse } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss'],
})

export class ProfilePostsComponent implements OnInit {

  @Input() likes: number;

  constructor(private user: UserService,
              private postService: PostService,
              private nav: NavController,
              private storage: StorageService,
              private translate: TranslateService,
              private alertCtrl: AlertController,
              private craft: CrafterService,
              private modal: ModalController) { }

  ngOnInit() {}

  async goFavorites(): Promise<void> {
    const modal = await this.modal.create({
      component: UserFavoritesComponent
    });
    await modal.present();
  }

  async goPosts(): Promise<void> {
    const modal = await this.modal.create({
      component: UserPostsComponent
    });
    await modal.present();
  }

  private deleteAccount(): void {
    this.user.deleteUser()
      .subscribe((res: UserResponse) => {
        if (res.ok) {
          this.craft.toast('deleted.user');
          this.logout(true);
        }
    });
  }

  async logout(remove: boolean): Promise<void> {
    remove ? this.storage.reset() :
    await this.storage.clear();
    this.user.logout();
    this.user.resetPage();
    this.postService.resetPage();
    this.nav.navigateRoot('/login');
  }

  async confirmDelete(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: this.translateMessage('delete.account'),
      message: this.translateMessage('are.you.sure.delete'),
      buttons: [
        {
          text: this.translateMessage('button.cancel'),
          role: 'cancel',
        }, {
          text: 'Ok',
          handler: () => {
            this.deleteAccount();
          }
        }
      ]
    });
    await alert.present();
  }

  private translateMessage(msg: string): string {
    const message = this.translate.instant(msg);
    return message;
  }

}
