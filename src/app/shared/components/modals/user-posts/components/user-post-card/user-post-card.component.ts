import { Component, OnInit, Input, HostListener, ViewChild, EventEmitter, Output } from '@angular/core';
import { Post, SLIDES_OPTIONS, FavoriteResponse, DeletePostResponse } from '@app/shared/interfaces/interfaces';
import { IonSlides, ModalController, AlertController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MapComponent } from '@app/shared/components/map/map.component';
import { UserService } from '@app/core/services/services.index';
import { CrafterService } from '@app/shared/crafter/crafter.service';
import { PostService } from '@core/services/post/post.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-post-card',
  templateUrl: './user-post-card.component.html',
  styleUrls: ['./user-post-card.component.scss'],
})

export class UserPostCardComponent implements OnInit {

  @Input() post: Post;
  @ViewChild(IonSlides) slides: IonSlides;
  @Output() removed: EventEmitter<string> = new EventEmitter<string>();
  slideOpts = SLIDES_OPTIONS;
  images: string[] = [];

  @HostListener('window:resize') onResize() {
    if (this.slides) { setTimeout(() => this.slides.update(), 100); }
  }

  constructor(private modalController: ModalController,
              private user: UserService,
              private craft: CrafterService,
              private postService: PostService,
              private alertCtrl: AlertController,
              private translate: TranslateService) { }

  ngOnInit() {
  }

  async checkCoords(): Promise<void> {
    const lat = Number(this.post.coords.split(',')[0]);
    const lng = Number(this.post.coords.split(',')[1]);
    const modal = await this.modalController.create({
      component: MapComponent,
      componentProps: {
        'lat': lat,
        'lng': lng
      }
    });
    await modal.present();
  }

  favorite(id: string): void {
    this.user.addFavorite(id)
      .subscribe(async (res: FavoriteResponse) => {
        if (res.ok) {
          this.craft.toast('favorite.added');
        }
      }, ((err: HttpErrorResponse) => {
          if (err.status === 406) {
            this.craft.toast('already.favorites');
          } else {
            this.craft.toast('error.updating');
            console.log(err);
          }
    }));
  }

  removePost(id: string): void {
    this.postService.deletePost(id)
      .subscribe((res: DeletePostResponse) => {
        if (res.ok) {
          this.removed.emit(id);
          this.craft.toast('post.removed');
        }
      }, (err: HttpErrorResponse) => {
          console.log(err);
    });
  }

  async confirmRemove(id: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: this.translateMessage('remove.post'),
      message: this.translateMessage('are.you.sure'),
      buttons: [
        {
          text: this.translateMessage('button.cancel'),
          role: 'cancel'
        }, {
          text: 'Ok',
          handler: () => {
            this.removePost(id);
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
