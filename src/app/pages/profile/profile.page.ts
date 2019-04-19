import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User, SLIDES_OPTIONS, PostResponse, Post } from '@app/shared/interfaces/interfaces';
import { UserService } from '@app/core/services/user/user.service';
import { CrafterService } from '@app/shared/crafter/crafter.service';
import { IonSlides } from '@ionic/angular';
import { PostService } from '../../core/services/post/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  user: User;
  @ViewChild(IonSlides) slides: IonSlides;
  sliderOptions = SLIDES_OPTIONS;
  likes: number;

  constructor(public userService: UserService,
              private postService: PostService,
              private craft: CrafterService) { }

  ngOnInit() {
    this.getUser();
  }

  ionViewDidEnter() {
    this.onResize();
    this.getPostByUser();
  }

  getUser(): void {
    this.user = this.userService.getUser();
  }

  private getPostByUser() {
    this.postService.getPostByUser()
      .subscribe((res: PostResponse) => {
        if (res.ok) {
          this.getTotalLikes(res.posts);
        }
      });
  }

  private getTotalLikes(posts: Post[]): number {
    let total = 0;
    posts.map(post => {
      return total += post.likes;
    });
    return this.likes = total;
  }

  @HostListener('window:resize') onResize() {
    if (this.slides) { setTimeout(() => this.slides.update(), 200); }
  }

  openSettings(event: any) {
    this.craft.popOver(event);
  }

}
