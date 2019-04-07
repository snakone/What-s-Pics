import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Avatar, AVATARS } from './avatar.data';

@Component({
  selector: 'app-pick-avatar',
  templateUrl: './pick-avatar.component.html',
  styleUrls: ['./pick-avatar.component.scss'],
})

export class PickAvatarComponent implements OnInit {

  @Output() avatar: EventEmitter<string> = new EventEmitter<string>();
  avatars: Avatar[] = AVATARS;

  slidesAvatarOpts = {
    effect: 'flip',
    zoom: false,
    slidesPerView: 3.5,
    noSwiping: false
  };

  constructor() { }

  ngOnInit() {

  }

  pickAvatar(avatar: Avatar) {
    this.avatar.emit(avatar.img);
    this.avatars.map(x => x.selected = false);
    avatar.selected = true;
  }

}
