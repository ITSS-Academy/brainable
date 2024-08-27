import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
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
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { Categories } from '../../../../../models/categories.model';
import { CategoriesState } from '../../../../../ngrx/categories/categories.state';
import * as CategoriesActions from '../../../../../ngrx/categories/categories.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-dialog',
  standalone: true,
  imports: [MaterialModule, SharedModule, MatDialogContent],
  templateUrl: './setting-dialog.component.html',
  styleUrl: './setting-dialog.component.scss',
})
export class SettingDialogComponent implements OnInit, OnDestroy {
  quiz!: Quiz;
  listCategories: Categories[] = [];
  isGettingCategories$ = this.store.select(
    'categories',
    'isGetAllCategoriesSuccessful',
  );
  subscription: Subscription[] = [];

  settings = {
    title: '',
    description: '',
    isPublic: false,
    imgUrl: '',
    category: <Categories>{},
  };

  uploadedFileURL: string = '';

  constructor(
    private store: Store<{
      auth: AuthState;
      quiz: QuizState;
      categories: CategoriesState;
    }>,
    private storage: Storage,
    private dialogRef: MatDialogRef<SettingDialogComponent>,
    private router: Router,
  ) {}

  ngOnInit() {
    this.subscription.push(
      this.store.select('quiz', 'quiz').subscribe((quiz) => {
        this.settings.title = quiz.title;
        this.settings.description = quiz.description;
        this.settings.isPublic = quiz.isPublic;
        this.settings.category = quiz.category;
      }),
      this.store.select('categories', 'categories').subscribe((categories) => {
        this.listCategories = categories as Categories[];
      }),
    );
    this.store.dispatch(CategoriesActions.getAllCategories());
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

  onCategoryChange(event: any) {
    this.settings.category = { ...this.listCategories[event.value] };
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
