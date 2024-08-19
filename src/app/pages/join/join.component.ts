import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as AuthActions from '../../ngrx/auth/auth.actions';
import { ProfileState } from '../../ngrx/profile/profile.state';
import { MaterialModule } from '../../shared/modules/material.module';
import { AuthState } from '../../ngrx/auth/auth.state';
import * as ProfileActions from '../../ngrx/profile/profile.actions';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [MaterialModule, LoadingComponent],
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss',
})
export class JoinComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<{ profile: ProfileState; auth: AuthState }>,
    private router: Router,
  ) {}

  subscriptions: Subscription[] = [];
  dashboard: string = 'My dashboard';
  profile$ = this.store.select('profile', 'profile');
  isGettingProfile$ = this.store.select('profile', 'isSuccessful');

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('auth', 'idToken').subscribe((token) => {
        if (token) {
          this.store.dispatch(ProfileActions.getProfile({ idToken: token }));
        }
      }),
      this.isGettingProfile$.subscribe((isGettingProfile) => {
        if (isGettingProfile) {
          this.profile$.subscribe((profile) => {
            if (profile) {
              this.dashboard = profile.fullName + "'s dashboard";
            }
          });
        }
      }),
    );
  }

  homePage() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {}
}
