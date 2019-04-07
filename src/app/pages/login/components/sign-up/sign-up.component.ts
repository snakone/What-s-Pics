import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, UserResponse } from '@app/shared/interfaces/interfaces';
import { LoginService, StorageService } from '@app/core/services/services.index';
import { Router } from '@angular/router';
import { CrafterService } from '@app/shared/crafter/crafter.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})

export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  namePattern = '^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$';
  matchError = false;

  constructor(private login: LoginService,
              private storage: StorageService,
              private router: Router,
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
     avatar: new FormControl('av-1png', []),
  password: new FormControl(null, [Validators.required,
                                   Validators.minLength(5),
                                   Validators.maxLength(25)]),
   password2: new FormControl('', [Validators.required])
    }, { validators: this.theyMatchError('password', 'password2')});
  }

  onSubmit() {
    if (this.signUpForm.invalid) { return false; }
    const user: User = this.signUpForm.value;
    this.signUp(user);
  }

  private signUp(user: User): void {
    this.login.signUp(user)
      .subscribe(async (res: UserResponse) => {
        if (res.ok) {
          await this.craft.alert('Welcome! ' + res.user.name);
          this.storage.setToken(res.token);
          this.router.navigateByUrl('/tabs/home');
        }
      }, (err) => {
          this.craft.alert('Email must be unique!');
          this.storage.removeToken();
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
