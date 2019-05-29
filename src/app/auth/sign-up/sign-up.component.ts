import { Component, OnInit } from '@angular/core';
import { ErrorReason } from '../auth-errors';
import { AuthService } from '../auth.service';

@Component({
             selector: 'app-sign-up',
             templateUrl: './sign-up.component.html',
             styleUrls: ['./sign-up.component.sass']
           })
export class SignUpComponent implements OnInit {
  loggingIn = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  private signUp(credentials) {
    this.authService.signUp$(credentials)
        .subscribe(user => {
          console.log('User signed up', user);
        }, err => {
          console.error('Failed', err);
          if (err.reason && err.reason === ErrorReason.EMAIL_EXISTS) {
            console.error('Failed because email exists');
          }
        });
  }

  private logIn(credentials) {
    this.authService.logIn(credentials);
  }

  handleSubmitted(credentials) {
    if (this.loggingIn) {
      this.logIn(credentials);
    } else {
      this.signUp(credentials);
    }
  }
}
