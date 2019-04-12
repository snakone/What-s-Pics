import { Component, OnInit, ViewChild } from '@angular/core';
import { INTRO_SLIDES, SLIDER_OPTIONS } from './slides.data';
import { IonSlides, NavController} from '@ionic/angular';
import { StorageService } from '../../core/storage/storage.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})

export class TutorialPage implements OnInit {

  @ViewChild('slider') slider: IonSlides;
  slides: any[] = INTRO_SLIDES;
  sliderOptions = SLIDER_OPTIONS;
  index: number;
  checkbox = true;

  constructor(private nav: NavController,
              private storage: StorageService) { }

  ngOnInit() {
  }

  async getIndex() {
    this.index = await this.slider.getActiveIndex();
  }

  goToSkip(): void {
    this.slider.slideTo(this.slides.length);
  }

  goToStart(): void {
    this.slider.slideTo(0);
  }

  goHome(): void {
    this.storage.save('tutorial', !this.checkbox);
    this.nav.navigateRoot('/tabs/home');
  }

}
