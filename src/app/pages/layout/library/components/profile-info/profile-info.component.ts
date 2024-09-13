import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { Store } from '@ngrx/store';
import { Profile } from '../../../../../models/profile.model';
import { ProfileState } from '../../../../../ngrx/profile/profile.state';
import {QuizState} from "../../../../../ngrx/quiz/quiz.state";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss',
})
export class ProfileInfoComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  profile!: Profile;
  isGettingProfileSuccessful$: Observable<boolean>;
  constructor(private store: Store<{ profile: ProfileState, quiz: QuizState }>) {
    this.isGettingProfileSuccessful$ = this.store.select('profile', 'isGettingProfileSuccessful');
  }

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
