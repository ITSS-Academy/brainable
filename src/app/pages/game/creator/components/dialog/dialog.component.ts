import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import { QuestionCheck } from '../../../../../models/question.model';
import * as QuizActions from '../../../../../ngrx/quiz/quiz.actions';
import { SettingDialogComponent } from '../setting-dialog/setting-dialog.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    MatDialogContent,
    MatDialogClose,
    MatDialogActions,
    MatDialogTitle,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  quizCheck!: QuestionCheck[];
  emptyQuestions: number[] = [];

  constructor(
    private store: Store<{ auth: AuthState; quiz: QuizState }>,
    private dialogRef: MatDialogRef<SettingDialogComponent>,
  ) {
    this.store.select('quiz', 'quizCheck').subscribe((quizCheck) => {
      this.quizCheck = quizCheck;
      this.emptyQuestions = quizCheck.map((question) => {
        let emptyCount = 0;
        if (!question.option1) emptyCount++;
        if (!question.option2) emptyCount++;
        if (!question.option3) emptyCount++;
        if (!question.option4) emptyCount++;
        return emptyCount;
      });
    });
  }

  @Output() emitter = new EventEmitter<number>();

  changActiveQuestion(index: number) {
    this.dialogRef.close();
    this.store.dispatch(QuizActions.storeQuestionErrorIndex({ index }));
  }
}
