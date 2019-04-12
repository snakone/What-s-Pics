import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, UserResponse } from '@app/shared/interfaces/interfaces';
import { LoginService } from '@app/core/services/services.index';
import { CrafterService } from '@app/shared/crafter/crafter.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '@app/core/storage/storage.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})

export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  namePattern = '^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$';
  matchError = false;
  avatar: string;

  constructor(private login: LoginService,
              private storage: StorageService,
              private nav: NavController,
              private craft: CrafterService) { }

  ngOnInit() {
    this.createSignUpForm();
  }

  createSignUpForm(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl(null, [Validators.required,
                                   Validators.minLength(3),
                                   Validators.maxLength(20),
                                   Validators.pattern(this.namePattern)]),
     email: new FormControl(null, [Validators.required,
                                   Validators.email,
                                   Validators.minLength(5),
                                   Validators.maxLength(35)]),
  password: new FormControl(null, [Validators.required,
                                   Validators.minLength(5),
                                   Validators.maxLength(25)]),
   password2: new FormControl('', [Validators.required])
    }, { validators: this.theyMatchError('password', 'password2')});
  }

  onSubmit() {
    if (this.signUpForm.invalid) { return false; }
    const user: User = this.signUpForm.value;
    user.avatar = this.avatar;
    this.signUp(user);
  }

  private signUp(user: User): void {
    this.login.signUp(user)
      .subscribe(async (res: UserResponse) => {
        if (res.ok) {
          await this.storage.setToken(res.token);
          this.nav.navigateRoot('/tutorial');
        }
      }, (err: HttpErrorResponse) => {
        if (err.status === 0) {
          this.craft.alert('login.error');
        } else {
          this.craft.alert('email.unique');
          this.storage.clear();
          console.log(err);
        }
    });
  }

  theyMatchError(one: string, two: string) {
    return (group: FormGroup) => {
      const p = group.controls[one].value;
      const m = group.controls[two].value;
      if (p === m) {
        this.matchError = false;
        return null;
      }
      this.matchError = true;
      return {
        error: true
      };
    };
  }

}
