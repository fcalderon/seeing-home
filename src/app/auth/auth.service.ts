import { Injectable } from '@angular/core';
import {AuthModule} from "./auth.module";
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "firebase";

@Injectable({
  providedIn: AuthModule
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  isLoggedIn$(): Observable<boolean> {
    return this.fireAuth.user.pipe(map(user => user !== null));
  }

  getUser$(): Observable<User | null> {
    return this.fireAuth.user;
  }
}
