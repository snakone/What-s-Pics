import { Component, OnInit, Input } from '@angular/core';
import { Post, PostResponse } from '@app/shared/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { PostService } from '@core/services/post/post.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
})

export class UserPostsComponent implements OnInit {

  posts: Post[];

  constructor(private modal: ModalController,
              private postService: PostService) { }

  ngOnInit() {
    this.getPostByUser();
  }

  private getPostByUser() {
    this.postService.getPostByUser()
      .subscribe((res: PostResponse) => {
        if (res.ok) {
          this.posts = res.posts;
        }
      });
  }

  close(): void {
    this.modal.dismiss();
  }

}
