import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import { Subscription } from 'rxjs';
import { Quiz, QuizDTO } from '../../../../../models/quiz.model';
import * as QuizActions from '../../../../../ngrx/quiz/quiz.actions';
import { Question, QuestionDTO } from '../../../../../models/question.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../../../../../components/login/login.component';
import { SettingDialogComponent } from '../setting-dialog/setting-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() title: string = 'Untitled Quiz';
  @Input() isEdit: boolean = false;

  subscription: Subscription[] = [];
  quiz!: Quiz;
  idToken!: string;

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
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.maxWidth = '85vw';
    dialogConfig.panelClass = 'custom-dialog-container';
    this.dialog.open(SettingDialogComponent, dialogConfig);
  }

  saveQuiz() {
    const quizUpdate: QuizDTO = {
      quiz: this.quiz,
    };
    this.store.dispatch(
      QuizActions.updateQuiz({ idToken: this.idToken, quiz: quizUpdate }),
    );
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
    };
  }

  addQuiz() {
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

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
