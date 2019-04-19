import { Component, OnInit, Input, ViewChild, HostListener, EventEmitter, Output } from '@angular/core';
import { Post, SLIDES_OPTIONS, Favorite } from '@app/shared/interfaces/interfaces';
import { IonSlides, ModalController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { MapComponent } from '@app/shared/components/map/map.component';
import { UserService } from '@app/core/services/user/user.service';
import { CrafterService } from '@app/shared/crafter/crafter.service';

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
              private http: HttpClient) { }

  ngOnInit() {
    this.getImages();
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
          this.craft.toast('Favorite removed!');
          this.removed.emit(this.favorite._id);
        }
      });
  }

  getImages() {
    if (this.favorite.post.images) {
      this.favorite.post.images.forEach(image => {
        this.http.get(image, { responseType: 'text' })
          .subscribe(res => {
            this.images.push(res);
          });
      });
    }
  }

  async confirm() {
    const alert = await this.alertCtrl.create({
      header: 'Remove Favorite',
      message: 'Are You sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
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

}
