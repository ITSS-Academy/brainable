import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Profile } from '../../../../../models/profile.model';
import { ProfileState } from '../../../../../ngrx/profile/profile.state';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import { AsyncPipe } from '@angular/common';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import * as ProfileActions from '../../../../../ngrx/profile/profile.actions';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss',
})
export class ProfileInfoComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  idToken!: string;
  profile!: Profile;
  isGettingProfileSuccessful$: Observable<boolean>;

  constructor(
    private store: Store<{
      profile: ProfileState;
      quiz: QuizState;
      auth: AuthState;
    }>,
  ) {
    this.isGettingProfileSuccessful$ = this.store.select(
      'profile',
      'isGettingProfileSuccessful',
    );
  }

  ngOnInit() {
    this.subscription.push(
      this.store.select('auth', 'idToken').subscribe((idToken) => {
        this.idToken = idToken;
      }),
      this.store.select('profile', 'profile').subscribe((profile) => {
        this.profile = profile;
      }),
      this.store
        .select('quiz', 'isDeleteQuizSuccessful')
        .subscribe((isDeleteQuizSuccessful) => {
          if (isDeleteQuizSuccessful) {
            this.store.dispatch(
              ProfileActions.getProfile({ idToken: this.idToken }),
            );
          }
        }),
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
