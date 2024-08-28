import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Profile } from '../../../../../models/profile.model';
import { ProfileState } from '../../../../../ngrx/profile/profile.state';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss',
})
export class ProfileInfoComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  profile!: Profile;

  constructor(private store: Store<{ profile: ProfileState }>) {}

  ngOnInit() {
    this.subscription.push(
      this.store.select('profile', 'profile').subscribe((profile) => {
        this.profile = profile;
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
