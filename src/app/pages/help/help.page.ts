import { Component, OnInit } from '@angular/core';
import { StorageService } from '@app/core/storage/storage.service';
import { UserService } from '@app/core/services/services.index';
import { PostService } from '@core/services/post/post.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})

export class HelpPage implements OnInit {

  constructor(private storage: StorageService,
              private nav: NavController,
              private user: UserService,
              private postService: PostService) { }

  ngOnInit() {
  }

  remove() {
    this.storage.clear();
  }

  async logout() {
    await this.storage.clear();
    this.user.logout();
    this.postService.resetPage();
    this.nav.navigateRoot('/login');
  }

}
