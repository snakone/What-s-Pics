import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { Post, SLIDES_OPTIONS, FavoriteResponse } from '@shared/interfaces/interfaces';
import { IonSlides, ModalController } from '@ionic/angular';
import { MapComponent } from '@shared/components/map/map.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '@app/core/services/services.index';
import { StorageService } from '@app/core/storage/storage.service';
import { CrafterService } from '@app/shared/crafter/crafter.service';
import { LikeResponse } from '../../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})

export class PostCardComponent implements OnInit {

  slideOpts = SLIDES_OPTIONS;

  @Input() post: Post;
  @ViewChild(IonSlides) slides: IonSlides;
  images: string[] = [];

  @HostListener('window:resize') onResize() {
    if (this.slides) { setTimeout(() => this.slides.update(), 100); }
  }

  constructor(private modalController: ModalController,
              private user: UserService,
              private http: HttpClient,
              private storage: StorageService,
              private craft: CrafterService) { }

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

  like(id: string): void {
    this.user.doLike(id).subscribe((res: LikeResponse) => {
      if (res.ok) { this.craft.toast('like.added'); }
    }, ((err: HttpErrorResponse) => {
        if (err.status === 406) {
          this.craft.toast('already.likes');
        } else {
          this.craft.toast('error.updating.');
          console.log(err);
        }
      })
    );
}

  favorite(id: string): void {
    this.user.addFavorite(id)
      .subscribe(async (res: FavoriteResponse) => {
        if (res.ok) { this.craft.toast('favorite.added'); }
      }, ((err: HttpErrorResponse) => {
          if (err.status === 406) {
            this.craft.toast('already.favorites');
          } else {
            this.craft.toast('error.updating');
            console.log(err);
          }
        })
      );
  }

}
