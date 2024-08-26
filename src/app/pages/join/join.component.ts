import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ProfileState } from '../../ngrx/profile/profile.state';
import { MaterialModule } from '../../shared/modules/material.module';
import { AuthState } from '../../ngrx/auth/auth.state';
import * as ProfileActions from '../../ngrx/profile/profile.actions';
import { LoadingComponent } from '../loading/loading.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { GameState } from '../../ngrx/game/game.state';
import * as GameActions from '../../ngrx/game/game.actions';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [MaterialModule, LoadingComponent, SharedModule],
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss',
})
export class JoinComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<{
      profile: ProfileState;
      auth: AuthState;
      game: GameState;
    }>,
    private router: Router,
  ) {}

  pin: string = '';
  isEmptyInput = false;

  subscriptions: Subscription[] = [];
  dashboard: string = 'My dashboard';
  profile$ = this.store.select('profile', 'profile');
  isGettingProfile$ = this.store.select(
    'profile',
    'isGettingProfileSuccessful',
  );

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

  joinGame() {
    if (this.pin.length == 0) {
      this.isEmptyInput = !this.isEmptyInput;
      setTimeout(() => {
        this.isEmptyInput = false;
      }, 5000);
    } else {
      this.store.dispatch(GameActions.storePin({ pin: this.pin }));
      this.router.navigate([`/guest/${this.pin}/waiting`]).then(() => {
        this.pin = '';
      });
    }
  }

  onKey(event: any) {
    if (event.key === 'Enter') {
      this.joinGame();
    }
  }

  ngOnDestroy(): void {}
}
