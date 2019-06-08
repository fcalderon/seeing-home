import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.css']
})
export class UserNavigationComponent implements OnDestroy, OnInit {
  private onDestroy$ = new Subject<boolean>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService,
              private route: ActivatedRoute, private router: Router) {}

  handleLogOutClicked() {
    this.auth.logOut();
  }

  ngOnInit(): void {
    this.auth.isLoggedIn$()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(loggedIn => {
          if (!loggedIn) {
            this.router.navigate(['/authenticate']);
          }
        });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
