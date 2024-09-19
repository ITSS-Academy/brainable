import {
  Component,
  ElementRef, OnChanges,
  OnDestroy,
  OnInit, SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import {BehaviorSubject, Subscription} from 'rxjs';
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
export class SettingDialogComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('imageContainer') imageContainer!: ElementRef;

  changeEvent = new BehaviorSubject<any>(null);

  quiz!: Quiz;
  listCategories: Categories[] = [];
  isGettingCategories$ = this.store.select(
    'categories',
    'isGetAllCategoriesSuccessful',
  );
  subscription: Subscription[] = [];
  categoryValue: number = 0;

  settings = {
    title: 'Untitled Quiz',
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

  isUpdateLoading$ = this.store.select('storage', 'isSettingUpload');
  isUpdateSuccess$ = this.store.select('storage', 'isSettingUploadSuccess');

  ngOnInit() {
    this.updateCharCountTitle()
    this.updateCharCountDescription()
    this.subscription.push(
      this.changeEvent.subscribe((data) => {
        if (data) return;
        if (data.type == 'question') {
          this.settings.title = data.title;
          this.updateCharCountTitle()
        } else if (data.type == 'description') {
          this.settings.description = data.description;
           this.updateCharCountDescription()
         }

        }
      ),
      this.store.select('quiz', 'quiz').subscribe((quiz) => {
        if (quiz) {

          this.settings.title = quiz.title || 'Untitled Quiz';
          this.settings.description = quiz?.description || '';
          this.settings.isPublic = quiz.isPublic;
          this.settings.category = quiz?.category || {
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

  selectImage(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) =>
        (this.selectedImage = reader.result as string | ArrayBuffer);
      reader.readAsDataURL(file);
      this.uploadQuizFile(fileInput);
    }
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
    let newCategory = {
      uid: this.listCategories[event.value].uid,
      name: this.listCategories[event.value].name,
      imgUrl: this.listCategories[event.value].imgUrl,
    };
    this.settings.category = { ...newCategory };
    this.store.dispatch(
      QuizActions.updateSetting({ setting: { ...this.settings } }),
    );
    this.store.select('quiz', 'quiz').subscribe((quiz) => {
      if (quiz) {
        this.quiz = quiz;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }


  charCountTitle = 75;
  charCountDescription = 300;

  updateCharCountTitle(): void {
    if (this.settings.title) {
      this.charCountTitle = 75 - this.settings.title.length;
    } else {
      this.charCountTitle = 75;
    }  }
  resetCharCount() {
    this.charCountTitle = 75; // Đặt lại giới hạn ký tự tiêu đề về 75
    this.charCountDescription = 300; // Đặt lại giới hạn ký tự mô tả về 300
    if (this.settings.title) {
      this.updateCharCountTitle();
      this.updateCharCountDescription();
    } else {
      this.settings.title = '';
      this.settings.description = '';
    }
  }

  updateCharCountDescription(): void {
    if (this.settings.description) {
      this.charCountDescription = 300 - this.settings.description.length;
    } else {
      this.charCountDescription = 300;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question']) {
      this.resetCharCount();
    }
  }
}
