import { Component, OnInit, Input, ViewChild, HostListener, EventEmitter, Output } from '@angular/core';
import { Post, SLIDES_OPTIONS, Favorite } from '@app/shared/interfaces/interfaces';
import { IonSlides, ModalController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { MapComponent } from '@app/shared/components/map/map.component';
import { UserService } from '@app/core/services/user/user.service';
import { CrafterService } from '@app/shared/crafter/crafter.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss'],
})

export class FavoriteCardComponent implements OnInit {

  @Input() favorite: Favorite;
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
              private alertCtrl: AlertController,
              private translate: TranslateService) { }

  ngOnInit() {
  }

  async checkCoords() {
    const lat = Number(this.favorite.post.coords.split(',')[0]);
    const lng = Number(this.favorite.post.coords.split(',')[1]);
    const modal = await this.modalController.create({
      component: MapComponent,
      componentProps: {
        'lat': lat,
        'lng': lng
      }
    });
    return await modal.present();
  }

  removeFavorite(): void {
    this.user.removeFavorite(this.favorite._id)
      .subscribe(res => {
        if (res.ok) {
          this.craft.toast('favorite.removed');
          this.removed.emit(this.favorite._id);
        }
      });
  }

  async confirm(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: this.translateMessage('remove.favorite'),
      message: this.translateMessage('are.you.sure'),
      buttons: [
        {
          text: this.translateMessage('button.cancel'),
          role: 'cancel'
        }, {
          text: 'Ok',
          handler: () => {
            this.removeFavorite();
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
