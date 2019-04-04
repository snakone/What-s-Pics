import { Component, OnInit } from '@angular/core';
import { PostService } from '@app/core/services/post/post.service';
import { PostResponse, Post } from '@app/shared/interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts()
      .subscribe((res: PostResponse) => {
        this.posts.push(...res.posts);
      });
  }

}
