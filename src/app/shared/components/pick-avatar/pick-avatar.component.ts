import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Avatar, AVATARS, SliderAvatarOpts } from './avatar.data';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-pick-avatar',
  templateUrl: './pick-avatar.component.html',
  styleUrls: ['./pick-avatar.component.scss'],
})

export class PickAvatarComponent implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  avatars: Avatar[] = AVATARS;
  @Output() avatar: EventEmitter<string> = new EventEmitter<string>();
  @Input() selected: string;

  slidesAvatarOpts = SliderAvatarOpts;

  constructor() { }

  ngOnInit() {
    this.setAvatar();
  }

  setAvatar() {
    if (!this.selected) { return; }

    this.avatars.map(x => {
      if (x.img === this.selected) {
        x.selected = true;
        this.slides.slideTo(x.index - 1);
      } else { x.selected = false; }
    });
  }

  pickAvatar(avatar: Avatar) {
    this.avatar.emit(avatar.img);
    this.avatars.map(x => x.selected = false);
    avatar.selected = true;
  }

}
