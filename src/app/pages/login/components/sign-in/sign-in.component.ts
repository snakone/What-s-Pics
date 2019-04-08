import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService, UserService } from '@app/core/services/services.index';
import { User, UserResponse } from '@app/shared/interfaces/interfaces';
import { CrafterService } from '@app/shared/crafter/crafter.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from '@app/core/storage/services/storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})

export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  user: User;

  constructor(private router: Router,
              private login: LoginService,
              private storage: StorageService,
              private craft: CrafterService,
              private userService: UserService) { }

  ngOnInit() {
    this.createSignUpForm();
    this.getUser();
   }

  createSignUpForm(): void {
    this.signInForm = new FormGroup({
       email: new FormControl(null, [Validators.required,
                                     Validators.email,
                                     Validators.minLength(5),
                                     Validators.maxLength(35)]),
    password: new FormControl(null, [Validators.required,
                                     Validators.minLength(5),
                                     Validators.maxLength(25)])});
  }

  getUser(): void {
    this.user = this.userService.getUser();
  }

  onSubmit() {
    if (this.signInForm.invalid) { return false; }
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;
    this.signIn(email, password);
  }

  private signIn(e: string, p: string): void {
    this.login.signIn(e, p)
      .subscribe(async (res: UserResponse) => {
        if (res.ok) {
          await this.storage.setToken(res.token);
          this.router.navigateByUrl('/tabs/home');
          this.craft.alert('login.welcome');
        }
      }, (err: HttpErrorResponse) => {
          if (err.status === 0) {
            this.craft.alert('login.error');
          } else {
            this.craft.alert('login.invalid');
            this.storage.clear();
            console.log(err);
          }
      });
  }

}
