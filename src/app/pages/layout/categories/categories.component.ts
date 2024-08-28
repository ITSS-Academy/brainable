import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { CategoriesState } from '../../../ngrx/categories/categories.state';
import { Subscription } from 'rxjs';
import * as CategoriesActions from '../../../ngrx/categories/categories.actions';
import { Categories, CategoriesByUid } from '../../../models/categories.model';
import { LoadingComponent } from '../../loading/loading.component';
import { GeneralInfoComponent } from '../library/components/general-info/general-info.component';
import { ProfileInfoComponent } from '../library/components/profile-info/profile-info.component';
import { QuizDetailComponent } from '../quiz/components/quiz-detail/quiz-detail.component';
import { Quiz } from '../../../models/quiz.model';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    LoadingComponent,
    GeneralInfoComponent,
    ProfileInfoComponent,
    QuizDetailComponent,
    NgIf,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  categoryId!: string;
  quiz!: Quiz[];
  isGettingCategorySuccess$ = this.store.select(
    'categories',
    'isGetCategorySuccessful',
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      categories: CategoriesState;
    }>,
  ) {
    this.categoryId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.store.dispatch(
      CategoriesActions.getCategoryById({ uid: this.categoryId }),
    );
    this.subscription.push(
      this.store.select('categories', 'category').subscribe((data) => {
        this.quiz = data.quizzes as Quiz[];
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
