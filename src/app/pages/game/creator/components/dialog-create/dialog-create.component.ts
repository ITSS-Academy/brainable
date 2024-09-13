import { Component, EventEmitter, inject, NgZone, Output } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { Question } from '../../../../../models/question.model';
import * as QuizActions from '../../../../../ngrx/quiz/quiz.actions';
import { Store } from '@ngrx/store';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import mammoth from 'mammoth';
import * as Papa from 'papaparse';
import { SettingDialogComponent } from '../setting-dialog/setting-dialog.component';
import { DialogImportNotificationComponent } from '../dialog-import-notification/dialog-import-notification.component';
@Component({
  selector: 'app-dialog-create',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './dialog-create.component.html',
  styleUrl: './dialog-create.component.scss',
})
export class DialogCreateComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogCreateComponent>,
    private store: Store<{ quiz: QuizState }>,
  ) {}

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name.toLowerCase();
      if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        this.readExcel(event);
      } else if (fileName.endsWith('.docx')) {
        this.readWord(event);
      } else if (fileName.endsWith('.csv')) {
        this.onFileSelectedCSV(event);
      } else {
        console.error('Unsupported file type');
      }
    }
  }

  readExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      const workBook = XLSX.read(fileReader.result, { type: 'binary' });
      const sheetName = workBook.SheetNames[0]; // Get the first sheet
      const worksheet = workBook.Sheets[sheetName];

      // Convert the entire sheet to JSON while using the first row as headers
      const excelData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      }) as any[][];

      // Extract headers (the first row)
      const headers = excelData[0]; // ["Question", "Option1", "Option2", "Option3", "Option4", "Answer"]
      const expectedHeaders = [
        'Question',
        'Option1',
        'Option2',
        'Option3',
        'Option4',
        'Answer',
      ];

      // Validate if headers match expected format
      const isValid =
        headers.length === expectedHeaders.length &&
        headers.every((header, index) => header === expectedHeaders[index]);

      if (!isValid) {
        console.log(
          'Invalid file format. Expected headers:',
          expectedHeaders,
          'but received:',
          headers,
        );
        // Notify the user with a message (replace with your preferred notification method)
        alert(
          'The file format is incorrect. Please make sure the file has the correct headers: ' +
            expectedHeaders.join(', '),
        );
        return;
      }

      // Extract rows starting from the second row (skipping the headers)
      const rows = excelData.slice(1);

      // Process rows
      const formattedData: Question[] = rows.map((row: any[]) => {
        return {
          id: '',
          imgUrl: '',
          question: row[0],
          option1: row[1],
          option2: row[2],
          option3: row[3],
          option4: row[4],
          answer: row[5],
          timeLimit: 10,
          points: 0,
        };
      });

      // Log the valid formatted data for debugging
      console.log('Formatted data:', formattedData);

      // Dispatch the formatted data to the store
      this.store.dispatch(
        QuizActions.updateQuestionByImport({ questions: formattedData }),
      );
      this.closeDialog();
    };
  }

  questions: Question[] = [];

  readWord(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const arrayBuffer = e.target.result;

        mammoth
          .extractRawText({ arrayBuffer: arrayBuffer })
          .then((result) => {
            const extractedText = result.value;
            this.parseText(extractedText);
          })
          .catch((err) => console.error('Error reading Word file:', err));
      };

      reader.readAsArrayBuffer(file);
    }
  }

  // Import Word file with validation
  parseText(text: string) {
    const lines = text.split('\n'); // Split text by line breaks
    let questionObj: Partial<Question> = {};
    let isValid = true;

    lines.forEach((line) => {
      if (line.startsWith('Question:')) {
        if (questionObj.question && this.isValidQuestion(questionObj)) {
          // Add previous valid question object to array
          this.questions.push(questionObj as Question);
        }
        questionObj = { question: line.replace('Question:', '').trim() };
      } else if (line.startsWith('Option1:')) {
        questionObj.option1 = line.replace('Option1:', '').trim();
      } else if (line.startsWith('Option2:')) {
        questionObj.option2 = line.replace('Option2:', '').trim();
      } else if (line.startsWith('Option3:')) {
        questionObj.option3 = line.replace('Option3:', '').trim();
      } else if (line.startsWith('Option4:')) {
        questionObj.option4 = line.replace('Option4:', '').trim();
      } else if (line.startsWith('Answer:')) {
        questionObj.answer = Number(line.replace('Answer:', '').trim());
      }
    });

    // Validate the last question object
    if (questionObj.question && this.isValidQuestion(questionObj)) {
      this.questions.push(questionObj as Question);
    } else if (!this.isValidQuestion(questionObj)) {
      console.error('Invalid question structure in the Word file.');
    }

    this.closeDialog();
    console.log(this.questions);
    this.store.dispatch(
      QuizActions.updateQuestionByImportWord({ questions: this.questions }),
    );
  }

  // Function to validate the question object and notify user of missing fields
  isValidQuestion(questionObj: Partial<Question>): boolean {
    const missingFields: string[] = [];

    // Check each required field and log if missing
    if (
      typeof questionObj.question !== 'string' ||
      questionObj.question.trim() === ''
    ) {
      missingFields.push('Question');
    }
    if (
      typeof questionObj.option1 !== 'string' ||
      questionObj.option1.trim() === ''
    ) {
      missingFields.push('Option1');
    }
    if (
      typeof questionObj.option2 !== 'string' ||
      questionObj.option2.trim() === ''
    ) {
      missingFields.push('Option2');
    }
    if (
      typeof questionObj.option3 !== 'string' ||
      questionObj.option3.trim() === ''
    ) {
      missingFields.push('Option3');
    }
    if (
      typeof questionObj.option4 !== 'string' ||
      questionObj.option4.trim() === ''
    ) {
      missingFields.push('Option4');
    }
    if (typeof questionObj.answer !== 'number') {
      missingFields.push('Answer');
    }

    // If there are missing fields, notify the user and log them
    if (missingFields.length > 0) {
      this.openDialog(missingFields); // Open the dialog with missing fields
      console.error('Missing fields:', missingFields.join(', ')); // Log the missing fields
      return false; // Invalid question
    }

    return true; // Valid question
  }

  // Function to notify the user about missing fields
  notifyUser(message: string) {
    // You can use your preferred notification library or simply alert the user
    alert(message); // This can be replaced with a custom notification logic
  }

  parsedData: any[] = []; // Declare parsedData to store the CSV data

  onFileSelectedCSV(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.parseCSV(file);
    }
  }

  parseCSV(file: File): void {
    Papa.parse(file, {
      header: true, // Parse with headers
      complete: (result) => {
        console.log('Parsed CSV data:', result.data);
        const missingDataMessages: string[] = [];

        this.parsedData = result.data.map((row: any, index: number) => {
          const missingFields: string[] = [];

          if (!row['question']) missingFields.push('question');
          if (!row['option1']) missingFields.push('option1');
          if (!row['option2']) missingFields.push('option2');
          if (!row['option3']) missingFields.push('option3');
          if (!row['option4']) missingFields.push('option4');
          if (!row['answer']) missingFields.push('answer');

          // If missing fields, add a message for the user
          if (missingFields.length > 0) {
            missingDataMessages.push(
              `Row ${index + 1} is missing: ${missingFields.join(', ')}`,
            );
          }

          return {
            id: '',
            imgUrl: '',
            question: row['question'],
            option1: row['option1'],
            option2: row['option2'],
            option3: row['option3'],
            option4: row['option4'],
            answer: Number(row.answer),
            timeLimit: 10,
          };
        });

        // Notify the user if there are missing fields
        if (missingDataMessages.length > 0) {
          alert(
            'The following issues were found:\n' +
              missingDataMessages.join('\n'),
          );
        } else {
          // Dispatch the action if no issues are found
          this.store.dispatch(
            QuizActions.updateQuestionByImportCSV({
              questions: this.parsedData,
            }),
          );
          this.closeDialog();
        }
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        alert('Error parsing CSV file. Please try again.');
      },
    });
  }

  dialog = inject(MatDialog);

  openDialog(missingFields: string[]) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.maxWidth = '85vw';
    dialogConfig.panelClass = 'custom-dialog-container';

    dialogConfig.data = { missingFields };

    this.dialog.open(DialogImportNotificationComponent, dialogConfig);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  downloadFile(event: MouseEvent, type: 'docx' | 'xlsx' | 'csv'): void {
    // Define the path to the file
    const wordFile = '../../../../assets/example-file/Question.docx';
    const excelFile = '../../../../assets/example-file/test.xlsx';
    const csvFile = '../../../../assets/example-file/Question.csv';
    const exampleFiles = [
      { type: 'docx', path: wordFile },
      { type: 'xlsx', path: excelFile },
      { type: 'csv', path: csvFile },
    ];
    const fileNames = ['example.docx', 'example.xlsx', 'example.csv'];

    // Create a link element
    const link = document.createElement('a');
    link.href = exampleFiles.find((file) => file.type === type)?.path || '';
    link.download = fileNames.find((file) => file.endsWith(type)) || '';

    // Append the link to the body (required for Firefox)
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  }
}
