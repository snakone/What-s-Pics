import { Component, OnInit } from '@angular/core';
import { User } from '@app/shared/interfaces/interfaces';
import { UserService } from '@app/core/services/user/user.service';
import { CrafterService } from '@app/shared/crafter/crafter.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  user: User;

  constructor(private userService: UserService,
              private craft: CrafterService) { }

  ngOnInit() {
    this.getUser();
  }

  private getUser(): void {
    this.user = this.userService.getUser();
  }

  openSettings(event: any) {
    this.craft.popOver(event);
  }

}
