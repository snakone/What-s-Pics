import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User, SLIDES_OPTIONS } from '@app/shared/interfaces/interfaces';
import { UserService } from '@app/core/services/user/user.service';
import { CrafterService } from '@app/shared/crafter/crafter.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  user: User;
  @ViewChild(IonSlides) slides: IonSlides;
  sliderOptions = SLIDES_OPTIONS;

  constructor(public userService: UserService,
              private craft: CrafterService) { }

  ngOnInit() {
    this.getUser();
  }

  ionViewDidEnter() {
    this.onResize();
  }

  @HostListener('window:resize') onResize() {
    if (this.slides) { setTimeout(() => this.slides.update(), 200); }
  }

  getUser(): void {
    this.user = this.userService.getUser();
  }

  openSettings(event: any) {
    this.craft.popOver(event);
  }

}
