import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorReason } from './auth-errors';
import { AuthServicesModule } from './auth-services.module';
import { Credentials } from './credentials';


/**
 * Service to handles Authorization and Authentication
 */
@Injectable({
  providedIn: AuthServicesModule
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  isLoggedIn$(): Observable<boolean> {
    return this.fireAuth.user.pipe(map(user => user !== null));
  }

  getUser$(): Observable<User | null> {
    return this.fireAuth.user;
  }

  signUp$(credentials: Credentials): Observable<User> {
    const subject = new Subject<User>();

    this.fireAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(result => {
            subject.next(result.user);
            subject.complete();
          },
          (err) => {
            console.error('Error signing up', err);

            if (err.code === 'auth/email-already-in-use') {
              subject.error({ reason: ErrorReason.EMAIL_EXISTS, cause: err });
            } else {
              subject.error({ reason: ErrorReason.UNKNOWN, cause: err });
            }
          });

    return subject.asObservable();
  }

  logIn(credentials: Credentials) {
    this.fireAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(result => { console.log(result); }, (err) => {
          console.log('Error logging in', err);
        });
  }

  logOut() {
    // TODO
  }
}
