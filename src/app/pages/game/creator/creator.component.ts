import {
  AfterViewChecked,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import {ActivatedRoute, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { QuizState } from '../../../ngrx/quiz/quiz.state';
import { Subscription } from 'rxjs';
import * as QuizActions from '../../../ngrx/quiz/quiz.actions';
import { Quiz } from '../../../models/quiz.model';
import { LoadingComponent } from '../../loading/loading.component';
import { Profile } from '../../../models/profile.model';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogCreateComponent } from './components/dialog-create/dialog-create.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SettingBarComponent } from './components/setting-bar/setting-bar.component';
import { JsonPipe, NgIf } from '@angular/common';
import {GameService} from "../../../services/game/game.service";

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
        points: 1,
      },
    ],
  };
  isCreateNewQuiz = false;
  isGetQuizByIdSuccessful = false;
  isEmptyInput = false;

  currentQuestionIndex = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{ auth: AuthState; quiz: QuizState }>,

  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.store.select('quiz', 'quiz').subscribe((quiz) => {
      console.log(quiz);
      if (quiz) {
        this.quiz = this.deepClone(quiz);
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
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();

      if (this.quiz && this.isCreateNewQuiz) {
        localStorage.setItem('unsavedQuiz', JSON.stringify(this.quiz));
      }
    });
  }

  isEmpty(): boolean {
    if (!this.quiz.title.trim()) {
      return true;
    }

    if (!Array.isArray(this.quiz.questions)) {
      return true;
    }

    for (const question of this.quiz.questions) {
      if (
        !question.question.trim() ||
        !question.option1.trim() ||
        !question.option2.trim() ||
        !question.option3.trim() ||
        !question.option4.trim()
      ) {
        return true;
      }
    }

    return false;
  }



  activeQuestion(index: number): void {
    this.currentQuestionIndex = index;
  }

  addQuestion(): void {
    if (this.isEmpty()) {
      this.isEmptyInput = true;
      return;
    }
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
