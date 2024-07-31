import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as AuthActions from '../../ngrx/auth/auth.actions';
import { Auth } from '@angular/fire/auth';
import { ProfileState } from '../../ngrx/profile/profile.state';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss',
})
export class JoinComponent implements OnInit, OnDestroy {
  constructor(
    private auth: Auth,
    private store: Store<{ profile: ProfileState }>,
    private router: Router,
  ) {}

  subscriptions: Subscription[] = [];
  profile$ = this.store.select('profile', 'profile');

  ngOnInit(): void {
    this.subscriptions.push(
      this.profile$.subscribe((profile) => {
        console.log(profile);
      }),
    );
  }

  signWithGoogle() {
    this.store.dispatch(AuthActions.login());
  }

  homePage() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {}
}
