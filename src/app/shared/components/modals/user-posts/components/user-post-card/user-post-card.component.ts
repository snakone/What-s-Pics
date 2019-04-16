import { Component, OnInit, Input, HostListener, ViewChild } from '@angular/core';
import { Post, SLIDES_OPTIONS, FavoriteResponse } from '@app/shared/interfaces/interfaces';
import { IonSlides, ModalController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MapComponent } from '@app/shared/components/map/map.component';
import { UserService } from '@app/core/services/services.index';
import { CrafterService } from '@app/shared/crafter/crafter.service';

@Component({
  selector: 'app-user-post-card',
  templateUrl: './user-post-card.component.html',
  styleUrls: ['./user-post-card.component.scss'],
})
export class UserPostCardComponent implements OnInit {

  @Input() post: Post;
  @ViewChild(IonSlides) slides: IonSlides;

  slideOpts = SLIDES_OPTIONS;
  images: string[] = [];

  @HostListener('window:resize') onResize() {
    if (this.slides) { setTimeout(() => this.slides.update(), 100); }
  }

  constructor(private modalController: ModalController,
              private user: UserService,
              private craft: CrafterService,
              private http: HttpClient) { }

  ngOnInit() {
    this.getImages();
  }

  async checkCoords() {
    const lat = Number(this.post.coords.split(',')[0]);
    const lng = Number(this.post.coords.split(',')[1]);
    const modal = await this.modalController.create({
      component: MapComponent,
      componentProps: {
        'lat': lat,
        'lng': lng
      }
    });
    return await modal.present();
  }

  getImages() {
    if (this.post.images) {
      this.post.images.forEach(image => {
        this.http.get(image, { responseType: 'text' })
          .subscribe(res => {
            this.images.push(res);
          });
      });
    }
  }

  favorite(id: string) {
    this.user.addFavorite(id)
      .subscribe(async (res: FavoriteResponse) => {
        if (res.ok) {
          console.log(res);
          this.craft.toast('Post Added to Favorites!');
        }
      }, ((err: HttpErrorResponse) => {
          if (err.status === 406) {
            this.craft.toast('Already on Favorites!');
          } else {
            this.craft.toast('Error Updating.');
            console.log(err);
          }
    }));
  }

}
