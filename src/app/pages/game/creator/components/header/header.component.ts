import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import { Subscription } from 'rxjs';
import { Quiz, QuizDTO } from '../../../../../models/quiz.model';
import * as QuizActions from '../../../../../ngrx/quiz/quiz.actions';
import {
  Question,
  QuestionCheck,
  QuestionDTO,
} from '../../../../../models/question.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SettingDialogComponent } from '../setting-dialog/setting-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogCreateComponent } from '../dialog-create/dialog-create.component';
import { MainContentComponent } from '../main-content/main-content.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, RouterLink, MainContentComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() title: string = 'Untitled Quiz';
  @Input() isEdit: boolean = false;
  @Output() excelDataEvent = new EventEmitter<any>();

  subscription: Subscription[] = [];
  quiz!: Quiz;
  quizCheck!: QuestionCheck[];
  idToken!: string;
  isEmptyInput = false;

  dialog = inject(MatDialog);

  constructor(
    private store: Store<{ auth: AuthState; quiz: QuizState }>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.store.select('auth', 'idToken').subscribe((idToken) => {
        this.idToken = idToken;
      }),
      this.store.select('quiz', 'quiz').subscribe((quiz) => {
        this.quiz = quiz;
      }),
      this.store.select('quiz', 'quizCheck').subscribe((quizCheck) => {
        this.quizCheck = quizCheck;
        console.log(this.quizCheck);
      }),
      this.store
        .select('quiz', 'isUpdateQuizSuccessful')
        .subscribe((isUpdateQuizSuccessful) => {
          if (isUpdateQuizSuccessful) {
            this.router.navigate(['/library']);
            this.store.dispatch(QuizActions.clearQuizState());
          }
        }),
      this.store
        .select('quiz', 'isCreateQuizSuccessful')
        .subscribe((isCreateQuizSuccessful) => {
          if (isCreateQuizSuccessful) {
            this.router.navigate(['/library']);
            this.store.dispatch(QuizActions.clearQuizState());
          }
        }),
    );

    this.store.dispatch(QuizActions.clearQuizCheck());
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.maxWidth = '85vw';
    dialogConfig.panelClass = 'custom-dialog-container';
    this.dialog.open(SettingDialogComponent, dialogConfig);
  }

  openDialogCreate() {
    const dialogCreateConfig = new MatDialogConfig();
    dialogCreateConfig.width = '60%';
    dialogCreateConfig.maxWidth = '85vw';
    dialogCreateConfig.panelClass = 'custom-dialog-container';
    this.dialog.open(DialogCreateComponent, dialogCreateConfig);
  }

  openNotiDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    dialogConfig.maxWidth = '85vw';
    dialogConfig.panelClass = 'custom-dialog-container';
    this.dialog.open(DialogComponent, dialogConfig);
  }

  saveQuiz() {
    let isEmptyInput = false;
    let subscription2: Subscription;
    subscription2 = this.store.select('quiz', 'quizCheck').subscribe((quiz) => {
      for (let question of quiz) {
        if (
          !question.question ||
          !question.option4 ||
          !question.option3 ||
          !question.option2 ||
          !question.option1 ||
          !question.answer
        ) {
          isEmptyInput = true;
          this.openNotiDialog();
          break;
        }
      }
    });
    subscription2.unsubscribe();
    if (!isEmptyInput) {
      const quizUpdate: QuizDTO = {
        quiz: this.quiz,
      };
      console.log(quizUpdate);

      this.store.dispatch(
        QuizActions.updateQuiz({ idToken: this.idToken, quiz: quizUpdate }),
      );
    }

  }

  convertToQuestionDTO(question: Question): QuestionDTO {
    return {
      question: question.question,
      answer: question.answer,
      option1: question.option1,
      option2: question.option2,
      option3: question.option3,
      option4: question.option4,
      imgUrl: question.imgUrl,
      timeLimit: question.timeLimit,
      points: question.points,
    };
  }

  addQuiz() {
    let isEmptyInput = false;
    let subscription2: Subscription;
    subscription2 = this.store.select('quiz', 'quizCheck').subscribe((quiz) => {
      for (let question of quiz) {
        if (
          !question.question ||
          !question.option4 ||
          !question.option3 ||
          !question.option2 ||
          !question.option1 ||
          !question.answer
        ) {
          isEmptyInput = true;
          this.openNotiDialog();
          break;
        }
      }
    });
    subscription2.unsubscribe();
    if (!isEmptyInput) {
      const quizAdd = {
        quiz: {
          ...this.quiz,
          questions: this.quiz.questions.map(this.convertToQuestionDTO),
        },
      };
      this.store.dispatch(
        QuizActions.createQuiz({ idToken: this.idToken, quiz: quizAdd }),
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
