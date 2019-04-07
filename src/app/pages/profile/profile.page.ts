import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, UserResponse } from '@app/shared/interfaces/interfaces';
import { UserService } from '@app/core/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  updateForm: FormGroup;
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUser();
    this.createUpdateForm();
    console.log(this.user);
  }

  createUpdateForm(): void {
    this.updateForm = new FormGroup({
       email: new FormControl(null, [Validators.required,
                                     Validators.email,
                                     Validators.minLength(5),
                                     Validators.maxLength(35)]),
        name: new FormControl(null, [Validators.required,
                                     Validators.minLength(5),
                                     Validators.maxLength(25)]),
      avatar: new FormControl(this.user.avatar || 'av-1.png', [])
    });
  }

  private getUser(): void {
    this.user = this.userService.getUser();
  }

  onSubmit() {
    if (this.updateForm.invalid) { return false; }
    console.log(this.updateForm.value);
    const user: User = this.updateForm.value;
    this.updateUser(user);
  }

  updateUser(user: User) {
    this.userService.updateUser(user)
      .subscribe((res: UserResponse) => {
        if (res.ok) {
          console.log(res);
        }
      }, (err => {
          console.log(err);
    }));
  }

  openSettings() {
    console.log('settings');
  }

}
