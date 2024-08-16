import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeneralInfoComponent } from './components/general-info/general-info.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import {
  CdkFixedSizeVirtualScroll,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { QuizDetailComponent } from '../quiz/components/quiz-detail/quiz-detail.component';
import { MaterialModule } from '../../../shared/modules/material.module';
import * as ProfileActions from '../../../ngrx/profile/profile.actions';
import * as QuizActions from '../../../ngrx/quiz/quiz.actions';
import * as AuthActions from '../../../ngrx/auth/auth.actions';
import { Store } from '@ngrx/store';
import { ProfileState } from '../../../ngrx/profile/profile.state';
import { QuizState } from '../../../ngrx/quiz/quiz.state';
import { Subscription } from 'rxjs';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    MaterialModule,
    GeneralInfoComponent,
    ProfileInfoComponent,
    CdkFixedSizeVirtualScroll,
    ScrollingModule,
    QuizDetailComponent,
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
})
export class LibraryComponent implements OnInit, OnDestroy {
  showAnswer = false;
  listQuiz: Quiz[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<{
      auth: AuthState;
      profile: ProfileState;
      quiz: QuizState;
    }>,
  ) {}

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('auth', 'idToken').subscribe((idToken) => {
        if (idToken) {
          this.store.dispatch(ProfileActions.getProfile({ idToken }));
          this.store.dispatch(QuizActions.getQuiz({ idToken }));
        }
      }),
      this.store.select('quiz', 'getQuiz').subscribe((listQuiz) => {
        listQuiz.forEach((quiz) => {
          this.listQuiz.push(quiz);
        });
        console.log(this.listQuiz);
      }),
    );
  }

  ngOnDestroy(): void {}
}
