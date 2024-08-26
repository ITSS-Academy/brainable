import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent implements OnInit, OnDestroy {
  @Input() question!: Question;
  @Input() index!: number;

  subscriptions: Subscription[] = [];
  uploadedFileURL: string = '';

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
        console.log('Data changed');
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  charCountQuestion: number = 120;
  charCountAnswer1: number = 75;
  charCountAnswer2: number = 75;
  charCountAnswer3: number = 75;
  charCountAnswer4: number = 75;

  selectedImage: string | ArrayBuffer = '';

  uploadFile(input: HTMLInputElement) {
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
                console.log('Uploaded file URL:', this.uploadedFileURL);
              })
              .catch((error) => {
                console.error('Error getting file URL:', error);
              });
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
          });
      }
    }
    this.question.imgUrl = this.uploadedFileURL;
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
    this.uploadFile(fileInput);
  }

  removeImage() {
    this.selectedImage = '';
    this.uploadedFileURL = '';
    this.question.imgUrl = '';
  }

  triggerFileInput(event: any): void {
    event.preventDefault();
    const fileInput = document.getElementById('uploadBtn') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  resetQuestion(): void {
    this.currentQuestion = {
      id: '',
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: 0,
      timeLimit: 10,
      imgUrl: '',
    };
    this.charCountQuestion = 120;
    this.charCountAnswer1 = 75;
    this.charCountAnswer2 = 75;
    this.charCountAnswer3 = 75;
    this.charCountAnswer4 = 75;
    this.selectedImage = '';
    this.uploadedFileURL = '';
  }

  isCheckAnswer1 = false;
  isCheckAnswer2 = false;
  isCheckAnswer3 = false;
  isCheckAnswer4 = false;

  isAnswer1Correct() {
    this.isCheckAnswer1 = !this.isCheckAnswer1;
    this.isCheckAnswer2 = false;
    this.isCheckAnswer3 = false;
    this.isCheckAnswer4 = false;
  }

  isAnswer2Correct() {
    this.isCheckAnswer2 = !this.isCheckAnswer2;
    this.isCheckAnswer1 = false;
    this.isCheckAnswer3 = false;
    this.isCheckAnswer4 = false;
  }

  isAnswer3Correct() {
    this.isCheckAnswer3 = !this.isCheckAnswer3;
    this.isCheckAnswer1 = false;
    this.isCheckAnswer2 = false;
    this.isCheckAnswer4 = false;
  }

  isAnswer4Correct() {
    this.isCheckAnswer4 = !this.isCheckAnswer4;
    this.isCheckAnswer1 = false;
    this.isCheckAnswer2 = false;
    this.isCheckAnswer3 = false;
  }

  // isIncorrect() {
  //   this.isCheck = false;
  // }
}
