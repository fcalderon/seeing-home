import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<boolean>();
  title = 'seeing-home';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.isLoggedIn$().pipe(takeUntil(this.unsubscribe)).subscribe(loggedIn => {
      if (!loggedIn) {
        this.router.navigate(['/signUp']);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }
}
