import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User, SLIDES_OPTIONS } from '@app/shared/interfaces/interfaces';
import { UserService } from '@app/core/services/user/user.service';
import { CrafterService } from '@app/shared/crafter/crafter.service';
import { IonSlides } from '@ionic/angular';
import { PostService } from '@core/services/post/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  user: User;
  sliderOptions = SLIDES_OPTIONS;
  likes: number;

  constructor(public userService: UserService,
              private postService: PostService,
              private craft: CrafterService) { }

  ngOnInit() {
    this.getUser();
  }

  ionViewDidEnter(): void {
    this.onResize();
    this.getTotalLikes();
  }

  private getUser(): void {
    this.user = this.userService.getUser();
  }

  private getTotalLikes(): void {
    this.postService.getTotalLikes()
     .subscribe((res: number) => {
        this.likes = res;
    });
  }

  @HostListener('window:resize') onResize() {
    if (this.slides) { setTimeout(() => this.slides.update(), 200); }
  }

  openSettings(event: any): Promise<void> {
    return this.craft.popOver(event);
  }

}
