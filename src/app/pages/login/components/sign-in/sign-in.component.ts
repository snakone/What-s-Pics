import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService, StorageService, UserService } from '@app/core/services/services.index';
import { User, UserResponse } from '@app/shared/interfaces/interfaces';
import { CrafterService } from '@app/shared/crafter/crafter.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})

export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  user: User;

  constructor(private nav: NavController,
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
        console.log(res);
        if (res.ok) {
          this.nav.navigateRoot('/tabs/home');
          await this.storage.setToken(res.token);
          this.craft.alert('Welcome! ' + res.user.name);
        }
      }, (err) => {
          this.craft.alert('Invalid Credentials!');
          this.storage.removeToken();
          console.log(err);
      });
  }

}
