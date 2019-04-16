import { Component, OnInit, Input } from '@angular/core';
import { Post } from '@app/shared/interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
})

export class UserPostsComponent implements OnInit {

  @Input() posts: Post[];

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }

  close(): void {
    this.modal.dismiss();
  }

}
