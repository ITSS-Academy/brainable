import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { SnowflakeId } from '@akashrajpurohit/snowflake-id';
import * as StorageActions from '../../../../../ngrx/storage/storage.action';
import { StorageState } from '../../../../../ngrx/storage/storage.state';

@Component({
  selector: 'app-setting-dialog',
  standalone: true,
  imports: [MaterialModule, SharedModule, MatDialogContent],
  templateUrl: './setting-dialog.component.html',
  styleUrl: './setting-dialog.component.scss',
})
export class SettingDialogComponent implements OnInit, OnDestroy {
  @ViewChild('imageContainer') imageContainer!: ElementRef;

  quiz!: Quiz;
  listCategories: Categories[] = [];
  isGettingCategories$ = this.store.select(
    'categories',
    'isGetAllCategoriesSuccessful',
  );
  subscription: Subscription[] = [];
  categoryValue: number = 0;

  settings = {
    title: '',
    description: '',
    isPublic: false,
    imgUrl: '',
    category: <Categories>{},
  };

  uploadedFileUrl: string = '';

  constructor(
    private store: Store<{
      auth: AuthState;
      quiz: QuizState;
      categories: CategoriesState;
      storage: StorageState;
    }>,
    private storage: Storage,
    private dialogRef: MatDialogRef<SettingDialogComponent>,
  ) {}

  isSettingUploadSuccess$ = this.store.select(
    'storage',
    'isSettingUploadSuccess',
  );

  ngOnInit() {
    this.subscription.push(
      this.store.select('quiz', 'quiz').subscribe((quiz) => {
        if (quiz) {
          this.settings.title = quiz.title;
          this.settings.description = '';
          this.settings.isPublic = quiz.isPublic;
          this.settings.category = {
            ...quiz.category,
            uid: 'caa70846-38d8-44b8-9e86-935a793f8be7',
            name: 'Ice breaker',
            imgUrl:
              'https://firebasestorage.googleapis.com/v0/b/brainable-d5919.appspot.com/o/ellipse1.png?alt=media&token=87a505f6-7e07-4b79-ad51-4e3990b21d5e',
          };
          this.settings.imgUrl = quiz.imgUrl;
        }
      }),
      this.store.select('categories', 'categories').subscribe((categories) => {
        this.listCategories = categories as Categories[];
      }),
      this.store
        .select('categories', 'isGetAllCategoriesSuccessful')
        .subscribe((isGetAllCategoriesSuccessful) => {
          if (isGetAllCategoriesSuccessful) {
            if (this.settings.category) {
              this.categoryValue = this.listCategories.findIndex(
                (category) => category.uid == this.settings.category.uid,
              );
            }
          }
        }),
    );
    this.store.dispatch(CategoriesActions.getAllCategories());
  }

  selectedImage: string | ArrayBuffer = '';

  // selectedImage!: File | null;
  //
  // selectImage(event: any): void {
  //   const fileInput = event.target as HTMLInputElement;
  //
  //   if (fileInput.files && fileInput.files.length > 0) {
  //     this.selectedImage = fileInput.files[0];
  //     console.log(this.selectedImage);
  //     this.processFiles(fileInput.files[0]);
  //   }
  // }
  //
  // processFiles(file: File): void {
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       const imageSrc = e.target.result;
  //       this.insertImageIntoContainer(imageSrc);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
  //
  // insertImageIntoContainer(imageSrc: string): void {
  //   const container = this.imageContainer.nativeElement;
  //   const containerWidth = container.clientWidth;
  //   const imgElement = document.createElement('div');
  //   imgElement.innerHTML = `<img style="height: 36vh; width: ${containerWidth}px; object-fit: scale-down" src="${imageSrc}" class="post-image" alt="Selected Image" />`;
  //   container.appendChild(imgElement);
  // }

  uploadQuizFile(input: HTMLInputElement) {
    this.store.dispatch(StorageActions.storeSettingUpload());
    const snowflake = SnowflakeId({
      workerId: 1,
      epoch: 1597017600000,
    });
    if (!input.files) return;
    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        let newId = snowflake.generate();
        console.log(newId);
        const storageRef = ref(this.storage, newId);
        uploadBytesResumable(storageRef, file)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then((url) => {
                this.uploadedFileUrl = url;
                this.store.dispatch(StorageActions.storeSettingUploadSuccess());
                this.settings.imgUrl = this.uploadedFileUrl;
                this.store.dispatch(
                  QuizActions.updateSetting({
                    setting: { ...this.settings },
                  }),
                );
              })
              .catch((error) => {});
          })
          .catch((error) => {});
      }
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
    this.uploadQuizFile(fileInput);
    this.selectedImage = '';
  }

  removeImage() {
    this.uploadedFileUrl = '';
    this.settings.imgUrl = '';
    this.store.dispatch(
      QuizActions.updateSetting({ setting: { ...this.settings } }),
    );
  }

  triggerFileInput(event: any): void {
    event.preventDefault();
    const fileInput = document.getElementById(
      'uploadBtn-quiz',
    ) as HTMLInputElement;
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
      QuizActions.updateSetting({ setting: { ...this.settings } }),
    );
  }

  onCategoryChange(event: any) {
    this.settings.category = { ...this.listCategories[event.value] };
    this.store.dispatch(
      QuizActions.updateSetting({ setting: { ...this.settings } }),
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
