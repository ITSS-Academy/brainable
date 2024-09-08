import { Component, EventEmitter, Output } from '@angular/core';
import { MatButton, MatFabButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AsyncPipe } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatOption } from '@angular/material/autocomplete';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';

import { MatCard, MatCardImage } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dialog-create',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    AsyncPipe,
    MatFabButton,
    MatFormField,
    MatIcon,
    MatLabel,
    MatOption,
    MatRadioButton,
    MatRadioGroup,
    MatSelect,
    ReactiveFormsModule,
    FormsModule,
    MatCard,
    RouterLink,
    MatCardImage,
  ],
  templateUrl: './dialog-create.component.html',
  styleUrl: './dialog-create.component.scss',
})
export class DialogCreateComponent {
  @Output() excelDataLoaded = new EventEmitter<any>(); // Emit Excel data
  ExcelData: any;

  constructor(
    private store: Store<{}>,
    private dialogRef: MatDialogRef<DialogCreateComponent>,
  ) {}

  // ngOnInit() {
  //   this.subscription.push(
  //     this.store.select('quiz', 'quiz').subscribe((quiz) => {
  //       if (quiz) {
  //         this.settings.title = quiz.title;
  //         this.settings.description = quiz.description;
  //         this.settings.isPublic = quiz.isPublic;
  //         this.settings.category = quiz.category;
  //         this.settings.imgUrl = quiz.imgUrl;
  //       }
  //     }),
  //     this.store.select('categories', 'categories').subscribe((categories) => {
  //       this.listCategories = categories as Categories[];
  //     }),
  //     this.store
  //       .select('categories', 'isGetAllCategoriesSuccessful')
  //       .subscribe((isGetAllCategoriesSuccessful) => {
  //         if (isGetAllCategoriesSuccessful) {
  //           if (this.settings.category) {
  //             this.categoryValue = this.listCategories.findIndex(
  //               (category) => category.uid == this.settings.category.uid,
  //             );
  //           }
  //         }
  //       }),
  //   );
  //   this.store.dispatch(CategoriesActions.getAllCategories());
  // }

  closeDialog(): void {
    this.dialogRef.close();
  }

  readExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      const workBook = XLSX.read(fileReader.result, { type: 'binary' });
      const sheetName = workBook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName[0]]);

      // Emit the Excel data to the parent component
      this.excelDataLoaded.emit(this.ExcelData);

      console.log(this.ExcelData);
    };
  }

  // ngOnDestroy() {
  //   this.subscription.forEach((sub) => sub.unsubscribe());
  // }
}
