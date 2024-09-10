import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import { QuestionState } from '../../../../../ngrx/question/question.state';
import { debounceTime, Subscription } from 'rxjs';
import { Question } from '../../../../../models/question.model';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import { BehaviorSubject } from 'rxjs';
import * as QuizActions from '../../../../../ngrx/quiz/quiz.actions';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SettingDialogComponent } from '../setting-dialog/setting-dialog.component';
import { SettingBarComponent } from '../setting-bar/setting-bar.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent implements OnInit, OnDestroy, OnChanges {
  @Input() question!: Question;
  @Input() index!: number;

  subscriptions: Subscription[] = [];
  uploadedFileURL: string = '';
  dialog = inject(MatDialog);

  changeEvent = new BehaviorSubject<any>(null);

  constructor(
    private storage: Storage,
    private store: Store<{
      auth: AuthState;
      question: QuestionState;
      quiz: QuizState;
    }>,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.changeEvent.subscribe((data) => {
        if (!data) return;
        if (data.type == 'question') {
          this.question.question = data.data;
          this.updateCharCountQuestion();
        } else if (data.type == 'option1') {
          this.question.option1 = data.data;
          this.updateCharCountAnswer(1);
        } else if (data.type == 'option2') {
          this.question.option2 = data.data;
          this.updateCharCountAnswer(2);
        } else if (data.type == 'option3') {
          this.question.option3 = data.data;
          this.updateCharCountAnswer(3);
        }
        this.store.dispatch(
          QuizActions.updateQuestionByIndex({
            question: this.question,
            index: this.index,
          }),
        );
      }),

    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question']) {
      this.resetCharCount();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  charCountQuestion: number = 120;
  charCountAnswer1: number = 75;
  charCountAnswer2: number = 75;
  charCountAnswer3: number = 75;
  charCountAnswer4: number = 75;

  selectedImage: string | ArrayBuffer = '';

  uploadQuestionFile(input: HTMLInputElement) {
    if (!input.files) return;
    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const storageRef = ref(this.storage, file.name);
        uploadBytesResumable(storageRef, file)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then((url) => {
                this.uploadedFileURL = url;
                this.question.imgUrl = this.uploadedFileURL;
                this.store.dispatch(
                  QuizActions.updateQuestionByIndex({
                    question: this.question,
                    index: this.index,
                  }),
                );
              })
              .catch((error) => {});
          })
          .catch((error) => {});
      }
    }
  }

  updateCharCountQuestion(): void {
    this.charCountQuestion = 120 - this.question.question.length;
  }

  updateCharCountAnswer(index: number): void {
    switch (index) {
      case 1:
        this.charCountAnswer1 = 75 - this.question.option1.length;
        break;
      case 2:
        this.charCountAnswer2 = 75 - this.question.option2.length;
        break;
      case 3:
        this.charCountAnswer3 = 75 - this.question.option3.length;
        break;
      case 4:
        this.charCountAnswer4 = 75 - this.question.option4.length;
        break;
    }
  }

  selectImage(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) =>
        (this.selectedImage = reader.result as string | ArrayBuffer);
      reader.readAsDataURL(file);
    }
    this.uploadQuestionFile(fileInput);
    this.selectedImage = '';
  }

  removeImage() {
    this.uploadedFileURL = '';
    this.question.imgUrl = '';
    this.store.dispatch(
      QuizActions.updateQuestionByIndex({
        question: this.question,
        index: this.index,
      }),
    );
  }

  triggerFileInput(event: any): void {
    event.preventDefault();
    const fileInput = document.getElementById('uploadBtn') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  isCheckAnswer1 = false;
  isCheckAnswer2 = false;
  isCheckAnswer3 = false;
  isCheckAnswer4 = false;

  checkAnswer() {
    if (this.question.answer === 1) {
      this.isCheckAnswer1 = true;
    } else if (this.question.answer === 2) {
      this.isCheckAnswer2 = true;
    } else if (this.question.answer === 3) {
      this.isCheckAnswer3 = true;
    } else if (this.question.answer === 4) {
      this.isCheckAnswer4 = true;
    }
  }

  isAnswer1Correct() {
    this.isCheckAnswer1 = !this.isCheckAnswer1;
    this.isCheckAnswer2 = false;
    this.isCheckAnswer3 = false;
    this.isCheckAnswer4 = false;
    this.question.answer = 1;
    this.store.dispatch(
      QuizActions.updateQuestionByIndex({
        question: this.question,
        index: this.index,
      }),
    );
  }

  isAnswer2Correct() {
    this.isCheckAnswer2 = !this.isCheckAnswer2;
    this.isCheckAnswer1 = false;
    this.isCheckAnswer3 = false;
    this.isCheckAnswer4 = false;
    this.question.answer = 2;
    this.store.dispatch(
      QuizActions.updateQuestionByIndex({
        question: this.question,
        index: this.index,
      }),
    );
  }

  isAnswer3Correct() {
    this.isCheckAnswer3 = !this.isCheckAnswer3;
    this.isCheckAnswer1 = false;
    this.isCheckAnswer2 = false;
    this.isCheckAnswer4 = false;
    this.question.answer = 3;
    this.store.dispatch(
      QuizActions.updateQuestionByIndex({
        question: this.question,
        index: this.index,
      }),
    );
  }

  isAnswer4Correct() {
    this.isCheckAnswer4 = !this.isCheckAnswer4;
    this.isCheckAnswer1 = false;
    this.isCheckAnswer2 = false;
    this.isCheckAnswer3 = false;
    this.question.answer = 4;
    this.store.dispatch(
      QuizActions.updateQuestionByIndex({
        question: this.question,
        index: this.index,
      }),
    );
  }

  resetCharCount() {
    this.isCheckAnswer1 = false;
    this.isCheckAnswer2 = false;
    this.isCheckAnswer3 = false;
    this.isCheckAnswer4 = false;
    this.checkAnswer();
    this.charCountQuestion = 120;
    this.charCountAnswer1 = 75;
    this.charCountAnswer2 = 75;
    this.charCountAnswer3 = 75;
    this.charCountAnswer4 = 75;
    if (this.question.question !== undefined) {
      this.updateCharCountQuestion();
      this.updateCharCountAnswer(1);
      this.updateCharCountAnswer(2);
      this.updateCharCountAnswer(3);
      this.updateCharCountAnswer(4);
    } else {
      this.question.question = '';
      this.question.option1 = '';
      this.question.option2 = '';
      this.question.option3 = '';
      this.question.option4 = '';
      this.question.imgUrl = '';
      this.question.answer = 0;
    }
  }

  onSettingClick() {
    console.log('Setting clicked');
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'custom-dialog-container';
    this.dialog.open(SettingBarComponent, dialogConfig);
  }
}
