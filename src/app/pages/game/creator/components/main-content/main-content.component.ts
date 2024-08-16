import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {
  uploadedFileURL: string = '';

  constructor(private storage: Storage) {}

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
  }

  questionInput: string = '';
  charCountQuestion: number = 120;

  answerInput1: string = '';
  answerInput2: string = '';
  answerInput3: string = '';
  answerInput4: string = '';

  charCountAnswer1: number = 75;
  charCountAnswer2: number = 75;
  charCountAnswer3: number = 75;
  charCountAnswer4: number = 75;

  updateCharCountQuestion(): void {
    this.charCountQuestion = 120 - this.questionInput.length;
  }

  updateCharCountAnswer(index: number): void {
    switch (index) {
      case 1:
        this.charCountAnswer1 = 75 - this.answerInput1.length;
        break;
      case 2:
        this.charCountAnswer2 = 75 - this.answerInput2.length;
        break;
      case 3:
        this.charCountAnswer3 = 75 - this.answerInput3.length;
        break;
      case 4:
        this.charCountAnswer4 = 75 - this.answerInput4.length;
        break;
    }
  }

  selectedImage: string | ArrayBuffer = '';

  selectImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = e => this.selectedImage = reader.result as string | ArrayBuffer;
      reader.readAsDataURL(file);
    }
  }
}
