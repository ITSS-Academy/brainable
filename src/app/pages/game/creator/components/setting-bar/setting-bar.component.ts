import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { Question } from '../../../../../models/question.model';
import { Subscription } from 'rxjs';
import { Categories } from '../../../../../models/categories.model';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import { CategoriesState } from '../../../../../ngrx/categories/categories.state';
import * as CategoriesActions from '../../../../../ngrx/categories/categories.actions';
import { AsyncPipe } from '@angular/common';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingDialogComponent } from '../setting-dialog/setting-dialog.component';

@Component({
  selector: 'app-setting-bar',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, MatDialogContent, ReactiveFormsModule],
  templateUrl: './setting-bar.component.html',
  styleUrl: './setting-bar.component.scss',
})
export class SettingBarComponent implements OnInit, OnDestroy {
  @Input() question!: Question;
  @Input() index!: number;
  subscriptions: Subscription[] = [];
  listCategories: Categories[] = [];
  isGettingCategories$ = this.store.select(
    'categories',
    'isGetAllCategoriesSuccessful',
  );

  constructor(
    private store: Store<{ auth: AuthState; categories: CategoriesState }>,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.store.select('categories', 'categories').subscribe((categories) => {
        this.listCategories = categories as Categories[];
      }),
    );
    this.store.dispatch(CategoriesActions.getAllCategories());
  }

  onPointsChange(event: any) {
    console.log('Selected points:', event.value);
  }

  onTimeLimitChange(event: any) {
    console.log('Selected time limit:', event.value);
  }

  // closeDialog(): void {
  //   this.dialogRef.close();
  // }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
