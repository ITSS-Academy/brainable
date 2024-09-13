import { Component, Inject, Input } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import * as QuizActions from '../../../../../ngrx/quiz/quiz.actions';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import { Store } from '@ngrx/store';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import { Question } from '../../../../../models/question.model';

@Component({
  selector: 'app-setting-bar-responsive-dialog',
  standalone: true,
  imports: [MaterialModule, MatDialogContent],
  templateUrl: './setting-bar-responsive-dialog.component.html',
  styleUrl: './setting-bar-responsive-dialog.component.scss',
})
export class SettingBarResponsiveDialogComponent {
  question: Question;
  index!: number;

  constructor(
    private store: Store<{ auth: AuthState; quiz: QuizState }>,
    public dialogRef: MatDialogRef<SettingBarResponsiveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.question = data.question;
    console.log(this.question);
  }

  onPointsChange(event: any) {
    this.question = { ...this.question, points: event.value };
    this.store.dispatch(
      QuizActions.updateQuestionByIndex({
        question: this.question,
        index: this.index,
      }),
    );
  }

  onTimeLimitChange(event: any) {
    console.log('Selected time limit:', event.value);
    this.question = { ...this.question, timeLimit: event.value };
    this.store.dispatch(
      QuizActions.updateQuestionByIndex({
        question: this.question,
        index: this.index,
      }),
    );
  }

  onSave(): void {
    this.dialogRef.close(this.question);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
