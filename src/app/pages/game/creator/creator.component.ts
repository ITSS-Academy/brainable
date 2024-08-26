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
import { Quiz, QuizDTO } from '../../../models/quiz.model';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-creator',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    HeaderComponent,
    MainContentComponent,
    LoadingComponent,
  ],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.scss',
})
export class CreatorComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  quiz!: Quiz;
  isEdit = false;

  quizDefault: Quiz = {
    id: 0,
    title: 'Untitled Quiz',
    description: '',
    isPublic: false,
    totalQuestions: 0,
    imgUrl: '',
    createdAt: new Date(),
    category: {
      uid: '08c8a3a2-bf52-4033-b294-fa4e685990e4',
      name: 'Ice breaker',
      imgUrl:
        'https://firebasestorage.googleapis.com/v0/b/brainable-d5919.appspot.com/o/ellipse1.png?alt=media&token=7e32d5f3-939b-43fd-be83-6e385799123a',
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
      },
    ],
  };
  isCreateNewQuiz = false;
  isGetQuizByIdSuccessful$ = this.store.select(
    'quiz',
    'isGetQuizByIdSuccessful',
  );

  currentQuestionIndex = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{ auth: AuthState; quiz: QuizState }>,
  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      this.isEdit = true;
      this.subscriptions.push(
        this.store.select('auth', 'idToken').subscribe((idToken) => {
          if (idToken) {
            this.store.dispatch(QuizActions.getQuizById({ idToken, id }));
          }
        }),
        this.store.select('quiz', 'quiz').subscribe((quiz) => {
          if (quiz) {
            this.quiz = this.deepClone(quiz);
          }
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
