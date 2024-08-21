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
import { Quiz, QuizDTO } from '../../../models/quiz.model';
import { LoadingComponent } from '../../loading/loading.component';
import { Question } from '../../../models/question.model';

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
  isGetQuizByIdSuccessful$ = this.store.select(
    'quiz',
    'isGetQuizByIdSuccessful',
  );
  questions: Question = {
    question: '',
    answer: 0,
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    imgUrl: '',
    timeLimit: 0,
  };
  currentQuestionIndex = 0;

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
      this.store
        .select('quiz', 'isDeleteQuestionSuccessful')
        .subscribe((isDeleteQuestionSuccessful) => {
          if (isDeleteQuestionSuccessful) {
          }
        });
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

  addQuestion(): void {
    // Ensure the questions property is an array
    if (!Array.isArray(this.quiz.questions)) {
      this.quiz.questions = [];
    }

    // Check if the quiz object is frozen or sealed
    if (Object.isFrozen(this.quiz) || Object.isSealed(this.quiz)) {
      // Create a new quiz object by copying properties
      this.quiz = {
        ...this.quiz,
        questions: [...this.quiz.questions, { ...this.questions }],
      };
      this.store.dispatch(
        QuizActions.addNewQuestion({ question: this.questions }),
      );
    } else {
      // Create a new array with the existing questions and the new question
      this.quiz.questions = [...this.quiz.questions, { ...this.questions }];
      this.store.dispatch(
        QuizActions.addNewQuestion({ question: this.questions }),
      );
    }

    this.currentQuestionIndex = this.quiz.questions.length - 1;

    // Dispatch the storeCurrentQuestion action
    this.store.dispatch(
      QuizActions.storeCurrentQuestion({
        question: this.questions,
        index: this.currentQuestionIndex,
      }),
    );
  }

  deleteQuestion() {
    this.store.dispatch(QuizActions.deleteQuestion());
  }
}
