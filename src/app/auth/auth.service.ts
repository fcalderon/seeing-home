import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorReason } from './auth-errors';
import { AuthServicesModule } from './auth-services.module';
import { Credentials } from './credentials';
import UserCredential = firebase.auth.UserCredential;

const FIREBASE_ERRORS = {
  UserNotFound: 'auth/user-not-found',
  EmailExists: 'auth/email-already-in-use'
};

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
            result.user.updateProfile({ displayName: credentials.name })
                  .then(() => {
                    subject.next(result.user);
                    subject.complete();
                  }, () => {
                    subject.next(result.user);
                    subject.complete();
                  });
          },
          (err) => {
            console.error('Error signing up', err);

            if (err.code === FIREBASE_ERRORS.EmailExists) {
              subject.error({ reason: ErrorReason.EMAIL_EXISTS, cause: err });
            } else {
              subject.error({ reason: ErrorReason.UNKNOWN, cause: err });
            }
          });

    return subject.asObservable();
  }

  logIn(credentials: Credentials): Observable<UserCredential> {
    const loginSubject = new Subject<UserCredential>();

    this.fireAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
        .then((result: UserCredential) => {
          loginSubject.next(result);
          loginSubject.complete();
        }, (err) => {
          const error = { reason: ErrorReason.UNKNOWN, cause: err };

          if (err.code === FIREBASE_ERRORS.UserNotFound) {
            error.reason = ErrorReason.INVALID_EMAIL_PASSWORD;
          }
          console.log('Error logging in', error);

          loginSubject.error(error);
        });

    return loginSubject.asObservable();
  }

  updateDisplayName(displayName: string) {
    this.fireAuth.auth.currentUser.updateProfile({ displayName });
  }

  logOut() {
    this.fireAuth.auth.signOut();
  }
}
