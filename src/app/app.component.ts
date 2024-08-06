import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { AuthState } from './ngrx/auth/auth.state';
import { ProfileState } from './ngrx/profile/profile.state';
import * as AuthActions from './ngrx/auth/auth.actions';
import * as ProfileActions from './ngrx/profile/profile.actions';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'brainable';

  token$ = this.store.select('auth', 'idToken');

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private auth: Auth,
    private store: Store<{ auth: AuthState; profile: ProfileState }>,
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken(true);
        this.store.dispatch(AuthActions.storeIdToken({ idToken }));
      }
    });
  }

  ngOnInit(): void {
    this.token$.subscribe(async (idToken) => {
      if (idToken) {
        this.store.dispatch(ProfileActions.createProfile({ idToken }));
      }
    });
  }
}
