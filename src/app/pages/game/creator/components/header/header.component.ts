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
import {MissingField, Question, QuestionDTO} from '../../../../../models/question.model';
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
  isEmptyInput = false;

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


// Method to check if any required field in the quiz or its questions is empty
  isEmpty(): boolean {
    let missingFields: MissingField[] = []; // To track missing fields

    // Check if the quiz title is empty
    if (!this.quiz.title.trim()) {
      missingFields.push({
        questionIndex: -1, // Use -1 or another value to indicate that this is a general quiz level issue
        question: {} as Question,
        missingFields: ['Quiz title is missing.']
      });
    }

    // Check if any question or its options are empty
    if (this.quiz && Array.isArray(this.quiz.questions)) {
      this.quiz.questions.forEach((question, index) => {
        let currentQuestionMissingFields: string[] = [];

        // Check question text
        if (!question.question.trim()) {
          currentQuestionMissingFields.push('Question text is missing.');
        }
        // Check each option for the question
        if (!question.option1.trim()) {
          currentQuestionMissingFields.push('Option 1 is empty.');
        }
        if (!question.option2.trim()) {
          currentQuestionMissingFields.push('Option 2 is empty.');
        }
        if (!question.option3.trim()) {
          currentQuestionMissingFields.push('Option 3 is empty.');
        }
        if (!question.option4.trim()) {
          currentQuestionMissingFields.push('Option 4 is empty.');
        }
        // Check if the question image URL is missing (if applicable)
        if (typeof question.imgUrl !== 'string' || !question.imgUrl.trim()) {
          currentQuestionMissingFields.push('Image URL is missing.');
        }
        // Check if a correct answer has been selected
        if (question.answer === 0) {
          currentQuestionMissingFields.push('No correct answer selected.');
        }
        // Check if the time limit is missing or set to 0
        if (question.timeLimit === 0) {
          currentQuestionMissingFields.push('Time limit is missing or set to 0.');
        }
        // Check if the points are missing or set to 0
        if (question.points === 0) {
          currentQuestionMissingFields.push('Points are missing or set to 0.');
        }

        // If there are any missing fields for this question, add them to the list
        if (currentQuestionMissingFields.length > 0) {
          missingFields.push({
            questionIndex: index,
            question: question,
            missingFields: currentQuestionMissingFields
          });
        }
      });
    } else {
      missingFields.push({
        questionIndex: -1,
        question: {} as Question,
        missingFields: ['No questions found in the quiz.']
      });
    }

    // Check if any fields are missing
    if (missingFields.length > 0) {
      // Log out the array of missing fields in the console
      missingFields.forEach(missingField => {
        console.log(`Question Index: ${missingField.questionIndex}`);
        console.log(`Question:`, missingField.question);
        console.log(`Missing Fields: ${missingField.missingFields.join(', ')}`);
      });
      return true;  // Return true if any required field is missing
    }

    return false;  // Return false if no fields are missing
  }


  addQuiz() {

    if (this.isEmpty()) {
      this.isEmptyInput = true;
      console.log('Please fill out all required fields!');
      this.openNotiDialog();
      return;
    }


    const quizAdd = {
      quiz: {
        ...this.quiz,
        questions: this.quiz.questions.map(this.convertToQuestionDTO),

        isDraft: this.quiz.isDraft || false,
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

  isFormInvalid = true;

  submitQuestion(): void {
    if (!this.isFormInvalid) {
      // Your submission logic here
    }
  }
}
