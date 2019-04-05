import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { Post } from '@shared/interfaces/interfaces';
import { IonSlides } from '@ionic/angular';
import { SLIDES_OPTS } from './slides.config';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})

export class PostCardComponent implements OnInit {

  slideOpts = SLIDES_OPTS;

  img1 = 'perro-1.jpg';
  img2 = 'perro-2.jpg';
  img3 = 'perro-3.jpg';

  @Input() post: Post;
  @ViewChild(IonSlides) slides: IonSlides;

  @HostListener('window:resize')
    onResize() {
    setTimeout(() => this.slides.update(), 100);
  }

  constructor() { }

  ngOnInit() {
  }

}
