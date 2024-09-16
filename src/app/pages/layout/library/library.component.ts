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
import { Store } from '@ngrx/store';
import { ProfileState } from '../../../ngrx/profile/profile.state';
import { QuizState } from '../../../ngrx/quiz/quiz.state';
import { Observable, Subscription } from 'rxjs';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { Quiz } from '../../../models/quiz.model';
import { Question } from '../../../models/question.model';
import { AsyncPipe } from '@angular/common';
import { LoadingComponent } from '../../loading/loading.component';

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
    AsyncPipe,
    LoadingComponent,
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
})
export class LibraryComponent implements OnInit, OnDestroy {
  showAnswer = false;
  listQuiz: Quiz[] = [];
  listQuestion: Question[] = [];
  subscriptions: Subscription[] = [];
  getListQuizSuccess$: Observable<boolean>;
  getListQuizLoading$: Observable<boolean>;
  deleteQuizLoading$: Observable<boolean>;

  constructor(
    private store: Store<{
      auth: AuthState;
      profile: ProfileState;
      quiz: QuizState;
    }>,
  ) {
    this.getListQuizSuccess$ = this.store.select(
      'quiz',
      'isGetAllQuizSuccessful',
    );
    this.getListQuizLoading$ = this.store.select('quiz', 'isGetAllQuizLoading');
    this.deleteQuizLoading$ = this.store.select('quiz', 'isDeleteQuizLoading');
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('auth', 'idToken').subscribe((idToken) => {
        if (idToken) {
          this.store.dispatch(ProfileActions.getProfile({ idToken }));
          this.store.dispatch(QuizActions.getAllQuiz({ idToken }));
        }
      }),
      this.store.select('quiz', 'quizzes').subscribe((quizzes) => {
        this.listQuiz = quizzes as Quiz[];
        if (this.listQuiz.length > 0) {
          this.listQuiz = this.listQuiz.filter((quiz) => !quiz.isDraft);
          this.listQuestion = this.listQuiz[0].questions;
        } else {
          this.listQuestion = [];
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  activeQuiz(index: number): void {
    this.listQuestion = this.listQuiz[index].questions;
  }

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }
}
