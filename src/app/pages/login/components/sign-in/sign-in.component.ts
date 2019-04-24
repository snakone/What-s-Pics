import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService, UserService } from '@app/core/services/services.index';
import { User, UserResponse } from '@app/shared/interfaces/interfaces';
import { CrafterService } from '@app/shared/crafter/crafter.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '@app/core/storage/storage.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})

export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  user: User;
  remember = false;

  constructor(private nav: NavController,
              private login: LoginService,
              private storage: StorageService,
              private craft: CrafterService,
              private userService: UserService) { }

  ngOnInit() {
    this.createSignUpForm();
    this.getUser();
    this.rememberMe();
   }

  private createSignUpForm(): void {
    this.signInForm = new FormGroup({
       email: new FormControl(null, [Validators.required,
                                     Validators.email,
                                     Validators.minLength(5),
                                     Validators.maxLength(35)]),
    password: new FormControl(null, [Validators.required,
                                     Validators.minLength(5),
                                     Validators.maxLength(25)])});
  }

  private getUser(): void {
    this.user = this.userService.getUser();
  }

  onSubmit(): void {
    if (this.signInForm.invalid) { return; }
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;
    this.signIn(email, password);
  }

  private signIn(e: string, p: string): void {
    this.login.signIn(e, p)
      .subscribe(async (res: UserResponse) => {
        if (res.ok) {
          this.userService.setUser(res.user);
          await this.storage.setToken(res.token);
          this.storage.save('remember', this.remember);
          this.checkTutorial();
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

  private checkTutorial(): void {
    this.storage.getTutorial() ?
    this.nav.navigateRoot('/tutorial') :
    this.nav.navigateRoot('/tabs/home');
  }

  private rememberMe(): void {
    if (this.storage.getRemember() && this.storage.getId()) {
      this.userService.getUserById(this.storage.getId())
        .subscribe((res: UserResponse) => {
          this.remember = true;
          this.user = res.user;
          this.signInForm.controls.email.setValue(res.user.email);
        }, (err) => {
            console.log(err);
        });
    }
  }

}
