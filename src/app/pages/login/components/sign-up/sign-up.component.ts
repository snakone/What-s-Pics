import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Avatar, AVATARS } from './avatar.data';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})

export class SignUpComponent implements OnInit {

  avatars: Avatar[] = AVATARS;
  signUpForm: FormGroup;
  namePattern = '^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$';
  matchError = false;

  slidesAvatarOpts = {
    effect: 'flip',
    zoom: false,
    slidesPerView: 2.6,
    noSwiping: false
  };

  constructor() { }

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
    console.log(this.signUpForm.value);
  }

  pickAvatar(avatar: Avatar): void {
    this.avatars.map(x => {
      return x.selected = false;
    });
    avatar.selected = true;
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
        theyMatch: true
      };
    };
  }

}
