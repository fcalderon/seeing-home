import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import { auth } from 'firebase/app';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  loggingIn = true;

  constructor(private fireAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  private signUp(credentials) {
    this.fireAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(result => { console.log(result) }, err => {})
  }

  private logIn(credentials) {
    this.fireAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(result => { console.log(result) }, err => {})
  }

  handleSubmitted(credentials) {
    if (this.loggingIn) {
      this.logIn(credentials);
    } else {
      this.signUp(credentials);
    }
  }
}
