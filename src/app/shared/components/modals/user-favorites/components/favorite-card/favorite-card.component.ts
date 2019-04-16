import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { Post, SLIDES_OPTIONS } from '@app/shared/interfaces/interfaces';
import { IonSlides, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { MapComponent } from '@app/shared/components/map/map.component';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss'],
})

export class FavoriteCardComponent implements OnInit {

  @Input() favorite: Post;
  @ViewChild(IonSlides) slides: IonSlides;

  slideOpts = SLIDES_OPTIONS;
  images: string[] = [];

  @HostListener('window:resize') onResize() {
    if (this.slides) { setTimeout(() => this.slides.update(), 100); }
  }

  constructor(private modalController: ModalController,
              private http: HttpClient) { }

  ngOnInit() {
    this.getImages();
  }

  async checkCoords() {
    const lat = Number(this.favorite.coords.split(',')[0]);
    const lng = Number(this.favorite.coords.split(',')[1]);
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
    if (this.favorite.images) {
      this.favorite.images.forEach(image => {
        this.http.get(image, { responseType: 'text' })
          .subscribe(res => {
            this.images.push(res);
          });
      });
    }
  }

}
