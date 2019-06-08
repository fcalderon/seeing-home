import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ErrorReason } from '../auth-errors';
import { AuthService } from '../auth.service';

export enum AuthFormMode {
  SIGN_UP = 'SIGN_UP',
  LOGIN = 'LOGIN'
}

@Component({
             selector: 'app-sign-up',
             templateUrl: './sign-up.component.html',
             styleUrls: ['./sign-up.component.scss']
           })
export class SignUpComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<boolean>();
  authFormMode = AuthFormMode.LOGIN;

  loggingIn = true;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.authService.isLoggedIn$().pipe(take(1))
        .subscribe(isLoggedIn => {
          if (isLoggedIn) {
            this.router.navigate(['']);
          }
        });
    this.route.data.pipe(takeUntil(this.onDestroy$))
        .subscribe((data: { mode: AuthFormMode }) => {
          if (data && data.mode) {
            this.authFormMode = data.mode;
          }
        });
    this.route.queryParams.pipe(takeUntil(this.onDestroy$))
        .subscribe((queryParams: { signingUp: boolean}) => {
          this.loggingIn = !queryParams.signingUp;
        });
  }

  private signUp(credentials) {
    this.authService.signUp$(credentials).pipe(takeUntil(this.onDestroy$))
        .subscribe(user => {
          console.log('User signed up', user);
          this.router.navigate(['']);
        }, err => {
          console.error('Failed', err);
          if (err.reason && err.reason === ErrorReason.EMAIL_EXISTS) {
            console.error('Failed because email exists');
          }
        });
  }

  private logIn(credentials) {
    this.authService.logIn(credentials).pipe(takeUntil(this.onDestroy$))
        .subscribe(firebaseUserCredentials => {
          console.log('Logged in successfully', firebaseUserCredentials);
          this.router.navigate(['']);
          },
          err => {
            console.error('There was an error logging in', err);
          });
  }

  handleSubmitted(credentials) {
    if (this.loggingIn) {
      this.logIn(credentials);
    } else {
      this.signUp(credentials);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
