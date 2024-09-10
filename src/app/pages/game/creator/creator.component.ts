import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { QuizState } from '../../../ngrx/quiz/quiz.state';
import { Subscription } from 'rxjs';
import * as QuizActions from '../../../ngrx/quiz/quiz.actions';
import { Quiz } from '../../../models/quiz.model';
import { LoadingComponent } from '../../loading/loading.component';
import { Profile } from '../../../models/profile.model';
import {DialogComponent} from "./components/dialog/dialog.component";
import {SettingBarComponent} from "./components/setting-bar/setting-bar.component";
import {FormArray, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-creator',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    HeaderComponent,
    MainContentComponent,
    LoadingComponent,
    DialogComponent,
    SettingBarComponent,
  ],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.scss',
})
export class CreatorComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  quiz!: Quiz;
  isEdit = false;


  quizDefault: Quiz = {
    id: '',
    title: 'Untitled Quiz',
    description: '',
    isPublic: false,
    totalQuestions: 0,
    imgUrl: '',
    createdAt: new Date(),
    authorId: <Profile>{},
    category: {
      uid: '',
      name: '',
      imgUrl: '',
    },
    questions: [
      {
        id: '',
        question: '',
        answer: 0,
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        imgUrl: '',
        timeLimit: 0,
        points: 0,
      },
    ],
  };
  isCreateNewQuiz = false;
  isGetQuizByIdSuccessful = false;

  currentQuestionIndex = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{ auth: AuthState; quiz: QuizState }>,
  ) {
  }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      this.isEdit = true;
      this.subscriptions.push(
        this.store.select('auth', 'idToken').subscribe((idToken) => {
          if (idToken) {
            this.store.dispatch(QuizActions.getQuizById({ id }));
          }
        }),
        this.store.select('quiz', 'quiz').subscribe((quiz) => {
          if (quiz) {
            this.quiz = this.deepClone(quiz);
          }
        }),
        this.store
          .select('quiz', 'isGetQuizByIdSuccessful')
          .subscribe((isGetQuizByIdSuccessful) => {
            this.isGetQuizByIdSuccessful = isGetQuizByIdSuccessful;
          }),
      );
    } else {
      this.isCreateNewQuiz = true;
      this.store.dispatch(
        QuizActions.storeDefaultQuiz({
          quiz: this.deepClone(this.quizDefault),
        }),
      );
      this.store.select('quiz', 'quiz').subscribe((quiz) => {
        if (quiz) {
          this.quiz = this.deepClone(quiz);
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
  }

  addQuestion(): void {
    this.store.dispatch(QuizActions.addNewQuestion());
    this.activeQuestion(this.quiz.questions.length - 1);
    this.scrollToBottom();
  }

  deleteQuestion(index: number) {
    this.store.dispatch(QuizActions.deleteQuestionByIndex({ index: index }));
    if (this.currentQuestionIndex === index && this.quiz.questions.length > 0) {
      this.activeQuestion(this.currentQuestionIndex - 1);
    }
  }

  deepClone(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  scrollToBottom() {
    const questionList = document.getElementById('content-container');
    if (questionList) {
      questionList.scrollTop = questionList.scrollHeight;
    }
  }
}
