import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { Post } from '@shared/interfaces/interfaces';
import { IonSlides, ModalController } from '@ionic/angular';
import { SLIDES_OPTS } from './slides.config';
import { MapComponent } from '../../../../shared/components/map/map.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})

export class PostCardComponent implements OnInit {

  slideOpts = SLIDES_OPTS;

  @Input() post: Post;
  @ViewChild(IonSlides) slides: IonSlides;
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
    this.post.images.forEach(image => {
      this.http.get(image, { responseType: 'text' })
        .subscribe(res => {
          this.images.push(res);
        });
    });
  }

}
