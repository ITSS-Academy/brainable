import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButton, MatFabButton } from '@angular/material/button';
import {
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  MatRadioButton,
  MatRadioChange,
  MatRadioGroup,
} from '@angular/material/radio';
import { MatIcon } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import { Quiz } from '../../../../../models/quiz.model';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';
import * as QuizActions from '../../../../../ngrx/quiz/quiz.actions';

@Component({
  selector: 'app-setting-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogClose,
    MatDialogContent,
    MatRadioGroup,
    MatRadioButton,
    MatFabButton,
    MatIcon,
    SharedModule,
  ],
  templateUrl: './setting-dialog.component.html',
  styleUrl: './setting-dialog.component.scss',
})
export class SettingDialogComponent implements OnInit, OnDestroy {
  quiz!: Quiz;
  subscription: Subscription[] = [];

  settings = {
    title: '',
    description: '',
    isPublic: false,
    imgUrl: '',
  };

  uploadedFileURL: string = '';

  constructor(
    private store: Store<{ auth: AuthState; quiz: QuizState }>,
    private storage: Storage,
    private dialogRef: MatDialogRef<SettingDialogComponent>,
  ) {}

  ngOnInit() {
    this.subscription.push(
      this.store.select('quiz', 'quiz').subscribe((quiz) => {
        this.settings.title = quiz.title;
        this.settings.description = quiz.description;
        this.settings.isPublic = quiz.isPublic;
      }),
    );
  }

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
    this.settings.imgUrl = this.uploadedFileURL;
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
    this.settings.imgUrl = '';
  }

  triggerFileInput(event: any): void {
    event.preventDefault();
    const fileInput = document.getElementById('uploadBtn') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  handleVisibilityChange(event: MatRadioChange): void {
    if (event.value === 'public') {
      this.settings.isPublic = true;
    }
    if (event.value === 'private') {
      this.settings.isPublic = false;
    }
  }

  saveChanges(): void {
    this.store.dispatch(
      QuizActions.updateSettingByIndex({ setting: { ...this.settings } }),
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
