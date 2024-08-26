import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileState } from "../../../../../ngrx/profile/profile.state";
import * as ProfileActions from "../../../../../ngrx/profile/profile.actions";
import { Auth, idToken } from "@angular/fire/auth";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']  // Corrected to styleUrls
})
export class ProfileInfoComponent {
  profile$ = this.store.select('profile');

  constructor(private store: Store<{ profile: ProfileState }>, private auth: Auth) {
    this.profile$.subscribe((profile) => {
      console.log(profile);
    });

    idToken(this.auth).subscribe((token: string | null) => {
      if (token) {
        this.store.dispatch(ProfileActions.getProfile({ idToken: token }));
      } else {
        console.warn('No idToken available');
      }
    });
  }
}
