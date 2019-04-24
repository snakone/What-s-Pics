import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { CrafterService } from '@app/shared/crafter/crafter.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  settings = true;
  slidesOpts = { effect: 'flip', zoom: false };
  colorIn = 'light';
  colorUp = 'medium';

  constructor(private craft: CrafterService) { }

  ngOnInit() {}

  segmentChanged(event: any): void {
    const index = Number(event.value);
    index === 1 ? this.settings = false : this.settings = true;
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

    openSettings(event: any): void {
    this.craft.popOver(event);
  }

}
