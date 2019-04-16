import { Component, OnInit, Input } from '@angular/core';
import { Post } from '@app/shared/interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss'],
})

export class UserFavoritesComponent implements OnInit {

  @Input() favorites: Post[];

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }

  close(): void {
    this.modal.dismiss();
  }

}
