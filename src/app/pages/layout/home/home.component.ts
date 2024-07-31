import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { ProfileState } from '../../../ngrx/profile/profile.state';
import { Subscription } from 'rxjs';
import * as ProfileActions from '../../../ngrx/profile/profile.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<{ auth: AuthState; profile: ProfileState }>,
    private router: Router,
  ) {}

  subscriptions: Subscription[] = [];

  ngOnInit(): void {}

  ngOnDestroy() {}
}
