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
  loading = true;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
    this.getStream();
  }

  getPosts(event?: any): void {
    if (!event) { this.loading = true; }
      this.postService.getPosts()
      .subscribe(async (res: PostResponse) => {
        if (res.ok) {
          this.posts.push(...res.posts);
          this.handleEvent(res.posts, event);
        }
    });
  }

  doRefresh(event: any): void {
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

  private getStream() {
    this.postService.stream
      .subscribe((res: Post) => {
        this.posts.unshift(res);
      });
  }

  private handleEvent(data: Post[], event?: any): void {
    if (!event) { this.loading = false; }
    if (event) { event.target.complete(); }
    if (event && data.length === 0) {
      this.scroll = false;
    }
  }

}
