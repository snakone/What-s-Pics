import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})

export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.createSignUpForm();
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

  onSubmit() {
    if (this.signInForm.invalid) { return false; }
    console.log(this.signInForm.value);
    this.router.navigateByUrl('/tabs/home');
  }

}
