import { Component, EventEmitter, NgZone, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { Question } from '../../../../../models/question.model';
import * as QuizActions from '../../../../../ngrx/quiz/quiz.actions';
import { Store } from '@ngrx/store';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import mammoth from 'mammoth';

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

      // Extract rows starting from the second row (skipping the headers)
      const rows = excelData.slice(1);

      // Process rows
      const formattedData: Question[] = rows.map((row: any[]) => {
        // const numbers = row[5].map(cell => (typeof cell === 'number' ? cell : NaN));
        return {
          id: '',
          imgUrl: '',
          question: row[0],
          option1: row[1],
          option2: row[2],
          option3: row[3],
          option4: row[4],
          answer: row['5'],
          timeLimit: 10,
        };
      });

      // Update the excelData array and trigger change detection

      console.log(formattedData);
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

  parseText(text: string) {
    const lines = text.split('\n'); // Split text by line breaks
    let questionObj: Partial<Question> = {};
    lines.forEach((line) => {
      if (line.startsWith('Question:')) {
        if (questionObj.question) {
          // Add previous question object to array
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

    // Add the last question object to array
    if (questionObj.question) {
      this.questions.push(questionObj as Question);
    }
    this.closeDialog();
    console.log(this.questions);
    this.store.dispatch(
      QuizActions.updateQuestionByImportWord({ questions: this.questions }),
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
