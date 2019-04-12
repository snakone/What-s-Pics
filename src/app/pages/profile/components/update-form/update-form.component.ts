import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, UserResponse } from '@app/shared/interfaces/interfaces';
import { UserService } from '@app/core/services/user/user.service';
import { CrafterService } from '@app/shared/crafter/crafter.service';
import { StorageService } from '@app/core/storage/storage.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss'],
})

export class UpdateFormComponent implements OnInit {

  @Input() user: User;
  @Output() updated: EventEmitter<User> = new EventEmitter<User>();
  updateForm: FormGroup;
  selected: string;

  constructor(private userService: UserService,
              private storage: StorageService,
              private craft: CrafterService) { }

  ngOnInit() {
    this.createUpdateForm();
    this.selected = this.user.avatar;
  }

  createUpdateForm(): void {
    this.updateForm = new FormGroup({
       email: new FormControl(this.user.email || null,
                             [Validators.required,
                              Validators.email,
                              Validators.minLength(5),
                              Validators.maxLength(35)]),
        name: new FormControl(this.user.name || null,
                              [Validators.required,
                               Validators.minLength(5),
                               Validators.maxLength(25)]),
      avatar: new FormControl(this.selected || 'av-1.png', [])
    });
  }

  onSubmit() {
    if (this.updateForm.invalid) { return false; }
    const user: User = this.updateForm.value;
    user.avatar = this.selected;
    this.updateUser(user);
  }

  updateUser(user: User) {
    this.userService.updateUser(user)
      .subscribe(async (res: UserResponse) => {
        if (res.ok) {
          this.updated.emit(res.user);
          await this.storage.save('token', res.token);
          this.craft.toast('Profile Updated!');
        }
      }, (err => {
          this.craft.toast('Error Updating.');
          console.log(err);
    }));
  }

}
