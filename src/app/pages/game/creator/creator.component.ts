import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SettingComponent } from './components/setting/setting.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { QuizState } from '../../../ngrx/quiz/quiz.state';
import { Subscription } from 'rxjs';
import * as QuizActions from '../../../ngrx/quiz/quiz.actions';
import { Quiz } from '../../../models/quiz.model';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-creator',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    HeaderComponent,
    MainContentComponent,
    SettingComponent,
    LoadingComponent,
  ],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.scss',
})
export class CreatorComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  quiz!: Quiz;
  currentQuestionIndex = 0;
  isGetQuizByIdSuccessful$ = this.store.select(
    'quiz',
    'isGetQuizByIdSuccessful',
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{ auth: AuthState; quiz: QuizState }>,
  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      this.subscriptions.push(
        this.store.select('auth', 'idToken').subscribe((idToken) => {
          if (idToken) {
            this.store.dispatch(QuizActions.getQuizById({ idToken, id }));
          }
        }),
        this.store.select('quiz', 'quiz').subscribe((quiz) => {
          if (quiz) {
            this.quiz = quiz;
          }
        }),
        this.store
          .select('quiz', 'isGetQuizByIdSuccessful')
          .subscribe((isGetQuizByIdSuccessful) => {
            if (isGetQuizByIdSuccessful) {
              this.store.dispatch(
                QuizActions.storeCurrentQuestion({
                  question: this.quiz.questions[this.currentQuestionIndex],
                  index: this.currentQuestionIndex,
                }),
              );
            }
          }),
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  activeQuestion(index: number): void {
    this.currentQuestionIndex = index;
    this.store.dispatch(
      QuizActions.storeCurrentQuestion({
        question: this.quiz.questions[this.currentQuestionIndex],
        index: this.currentQuestionIndex,
      }),
    );
  }
}
