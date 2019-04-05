import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  slidesOpts = {
    effect: 'flip',
    zoom: false
  };

  colorIn = 'light';
  colorUp = 'medium';

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event: any) {
    const index = Number(event.value);
    this.slides.slideTo(index);
    this.changeColor(index);
  }

  private changeColor(i: number): void {
    if (i === 0) {
      this.colorIn = 'light';
      this.colorUp = 'medium';
    } else {
      this.colorIn = 'medium';
      this.colorUp = 'light';
    }
  }

}
