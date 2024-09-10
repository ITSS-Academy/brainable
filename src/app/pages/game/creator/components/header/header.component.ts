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
import { Question, QuestionDTO } from '../../../../../models/question.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../../../../../components/login/login.component';
import { SettingDialogComponent } from '../setting-dialog/setting-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogCreateComponent } from '../dialog-create/dialog-create.component';
import * as XLSX from 'xlsx';
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
  idToken!: string;

  dialog = inject(MatDialog);

  ExcelData: any;

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
      points: question.points,
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

  // readExcel(event: any) {
  //   let file = event.target.files[0];
  //   let fileReader = new FileReader();
  //   fileReader.readAsBinaryString(file);
  //
  //   fileReader.onload = (e) => {
  //     const workBook = XLSX.read(fileReader.result, { type: 'binary' });
  //     const sheetName = workBook.SheetNames;
  //     this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName[0]]);
  //     console.log(this.ExcelData);
  //   };
  // }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
