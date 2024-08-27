import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import { Categories } from '../../../../../models/categories.model';
import { Subscription } from 'rxjs';
import * as CategoriesActions from '../../../../../ngrx/categories/categories.actions';
import { CategoriesState } from '../../../../../ngrx/categories/categories.state';
import { AsyncPipe } from '@angular/common';
import { Question } from '../../../../../models/question.model';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [MatButton, MatFormField, MatLabel, MatOption, MatSelect, AsyncPipe],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss',
})
export class SettingComponent implements OnInit, OnDestroy {
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

  onModeChange(event: any) {
    console.log('Selected mode:', event.value);
  }

  onTimeLimitChange(event: any) {
    console.log('Selected time limit:', event.value);
  }

  onCategoryChange(event: any) {
    console.log('Selected category:', event.value);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
