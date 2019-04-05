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
  scroll = true;
  refresh = true;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(event?: any): void {
    this.postService.getPosts()
      .subscribe((res: PostResponse) => {
        this.posts.push(...res.posts);
        if (event) { event.target.complete(); }
        if (event && res.posts.length === 0) {
          this.scroll = false;
        }
    });
  }

  doRefresh(event: any) {
    this.posts = [];
    this.postService.page = 0;
    this.getPosts(event);
    this.scroll = true;
    this.refresh = false;
    setTimeout(() => {
      this.refresh = true;
    }, 3000);
  }

  onScroll(event: any): void {
    this.getPosts(event);
  }

}
