import {
  AfterViewChecked,
  Component,
  OnDestroy,
  OnInit,
  inject,
  Input,
} from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { QuizState } from '../../../ngrx/quiz/quiz.state';
import { Subscription } from 'rxjs';
import * as QuizActions from '../../../ngrx/quiz/quiz.actions';
import { Quiz, QuizDTO } from '../../../models/quiz.model';
import { LoadingComponent } from '../../loading/loading.component';
import { Profile } from '../../../models/profile.model';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogCreateComponent } from './components/dialog-create/dialog-create.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SettingBarComponent } from './components/setting-bar/setting-bar.component';
import { JsonPipe, NgIf } from '@angular/common';
import { GameService } from '../../../services/game/game.service';
import { Categories } from '../../../models/categories.model';

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
    JsonPipe,
    NgIf,
    DialogCreateComponent,
    SettingBarComponent,
  ],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.scss',
})
export class CreatorComponent implements OnInit, OnDestroy, AfterViewChecked {
  subscriptions: Subscription[] = [];
  quiz!: Quiz;
  isEdit = false;
  dialog = inject(MatDialog);

  quizDefault: Quiz = {
    id: '',
    title: 'Untitled Quiz',
    description: '',
    isPublic: true,
    totalQuestions: 0,
    imgUrl: '',
    createdAt: new Date(),
    authorId: <Profile>{},
    category: <Categories>{
      uid: 'caa70846-38d8-44b8-9e86-935a793f8be7',
      imgUrl: 'Ice breaker',
      name: 'https://firebasestorage.googleapis.com/v0/b/brainable-d5919.appspot.com/o/ellipse1.png?alt=media&token=87a505f6-7e07-4b79-ad51-4e3990b21d5e',
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
        timeLimit: 10,
        points: 1,
      },
    ],
  };
  isCreateNewQuiz = false;
  isGetQuizByIdSuccessful = false;
  idToken = '';

  currentQuestionIndex = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      auth: AuthState;
      quiz: QuizState;
      profile: Profile;
    }>,
  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.store.select('auth', 'idToken').subscribe((idToken) => {
      this.idToken = idToken;
    });

    this.store.select('quiz', 'quiz').subscribe((quiz) => {
      console.log(quiz);
      this.quiz = { ...this.quiz, category: this.quizDefault.category };
      if (quiz) {
        console.log(quiz.id);
        this.quiz = this.deepClone(quiz);
      }
    });
    this.store
      .select('quiz', 'questionErrorIndex')
      .subscribe((questionErrorIndex) => {
        console.log('questionErrorIndex', questionErrorIndex);
        if (questionErrorIndex !== null) {
          console.log('questionErrorIndex', questionErrorIndex);
          this.currentQuestionIndex = questionErrorIndex;
          this.activeQuestion(questionErrorIndex);
        }
      });
    if (id) {
      this.isEdit = true;
      this.subscriptions.push(
        this.store.select('auth', 'idToken').subscribe((idToken) => {
          if (idToken) {
            this.store.dispatch(QuizActions.getQuizById({ id }));
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
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '60%';
      dialogConfig.maxWidth = '85vw';
      dialogConfig.panelClass = 'custom-dialog-container';
      this.dialog.open(DialogCreateComponent, dialogConfig);

      this.store.dispatch(
        QuizActions.storeDefaultQuiz({
          quiz: this.deepClone(this.quizDefault),
        }),
      );
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(QuizActions.storeQuestionErrorIndex({ index: 0 }));
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  activeQuestion(index: number): void {
    this.currentQuestionIndex = index;
  }

  addQuestion(): void {
    this.store.dispatch(
      QuizActions.storeQuestionErrorIndex({
        index: this.quiz.questions.length - 1,
      }),
    );
    this.store.dispatch(QuizActions.addNewQuestion());
    this.activeQuestion(this.quiz.questions.length - 1);
    setTimeout(() => {
      this.scrollToActiveQuestion();
    }, 0);
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

  duplicateQuestion(index: number) {
    this.store.dispatch(QuizActions.duplicateQuestionByIndex({ index: index }));
    setTimeout(() => {
      this.currentQuestionIndex = index + 1;
      if (this.currentQuestionIndex + 1 == this.quiz.questions.length) {
        this.scrollToActiveQuestion();
      }
      this.activeQuestion(this.currentQuestionIndex);
    }, 0);
  }

  ngAfterViewChecked(): void {
    this.scrollToActiveQuestion();
  }

  scrollToActiveQuestion() {
    const activeQuestionId = 'question-' + this.currentQuestionIndex;
    const activeElement = document.getElementById(activeQuestionId);
    if (activeElement) {
      activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
