import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { Question } from '../../../../../models/question.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Categories } from '../../../../../models/categories.model';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import { CategoriesState } from '../../../../../ngrx/categories/categories.state';
import * as CategoriesActions from '../../../../../ngrx/categories/categories.actions';
import { AsyncPipe } from '@angular/common';
import {
  MatDialog,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingDialogComponent } from '../setting-dialog/setting-dialog.component';
import * as QuizActions from '../../../../../ngrx/quiz/quiz.actions';
import { SettingBarResponsiveDialogComponent } from '../setting-bar-responsive-dialog/setting-bar-responsive-dialog.component';

@Component({
  selector: 'app-setting-bar',
  standalone: true,
  imports: [
    MaterialModule,
    AsyncPipe,
    MatDialogContent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './setting-bar.component.html',
  styleUrl: './setting-bar.component.scss',
})
export class SettingBarComponent implements OnInit, OnDestroy {
  @Input() question!: Question;
  @Input() index!: number;
  subscriptions: Subscription[] = [];
  listCategories: Categories[] = [];

  dialog = inject(MatDialog);

  constructor(
    private store: Store<{ auth: AuthState; categories: CategoriesState }>,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.store.select('categories', 'categories').subscribe((categories) => {
        this.listCategories = categories as Categories[];
      }),
    );
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

  saveChanges() {
    this.store.dispatch(
      QuizActions.updateQuestionByIndex({
        question: this.question,
        index: this.index,
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
