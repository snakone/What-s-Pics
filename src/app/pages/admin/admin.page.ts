import { Component, OnInit } from '@angular/core';
import { PostService } from '@app/core/services/post/post.service';
import { Post, PostResponse } from '@app/shared/interfaces/interfaces';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DeletePostResponse } from '@shared/interfaces/interfaces';
import { CrafterService } from '@shared/crafter/crafter.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})

export class AdminPage implements OnInit {

  posts: Post[] = [];

  constructor(private postService: PostService,
              private alertCtrl: AlertController,
              private translate: TranslateService,
              private craft: CrafterService) { }

  ngOnInit() {
    this.getAllPosts();
  }

  private getAllPosts(): void {
    this.postService.getAllPosts()
      .subscribe((res: PostResponse) => {
        this.posts.push(...res.posts);
    });
  }

  removePost(id: string): void {
    this.postService.deletePost(id)
      .subscribe((res: DeletePostResponse) => {
        if (res.ok) {
          this.posts = this.posts.filter(x => x._id !== id);
          this.craft.toast('post.removed');
          this.postService.deleteStream.next(id);
        }
    });
  }

  async confirmRemove(id: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: this.translateMessage('remove.post'),
      message: this.translateMessage('are.you.sure'),
      buttons: [
        {
          text: this.translateMessage('button.cancel'),
          role: 'cancel'
        }, {
          text: 'Ok',
          handler: () => {
            this.removePost(id);
          }
        }
      ]
    });
    await alert.present();
  }

    private translateMessage(msg: string): string {
    const message = this.translate.instant(msg);
    return message;
  }

}
