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
import { Subscription } from 'rxjs';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { Quiz } from '../../../models/quiz.model';
import { Storage } from '@angular/fire/storage';
import { Question } from '../../../models/question.model';

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
  listQuestion: Question[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<{
      auth: AuthState;
      profile: ProfileState;
      quiz: QuizState;
    }>,
    private storage: Storage,
  ) {}

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
        this.listQuestion = this.listQuiz[0].questions;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  activeQuiz(index: number): void {
    this.listQuestion = this.listQuiz[index].questions;
  }
}
