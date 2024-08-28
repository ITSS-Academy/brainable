import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkFixedSizeVirtualScroll } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';
import { Quiz } from '../../../models/quiz.model';
import { CategoriesByUid } from '../../../models/categories.model';
import { Question } from '../../../models/question.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CategoriesState } from '../../../ngrx/categories/categories.state';
import * as CategoriesActions from '../../../ngrx/categories/categories.actions';
import { MaterialModule } from '../../../shared/modules/material.module';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CdkFixedSizeVirtualScroll, MaterialModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  categoryId!: string;
  quizzes!: Quiz[];
  category!: CategoriesByUid;
  questions!: Question[];

  showAnswer: boolean = false;

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
        // this.quiz = data.quizzes as Quiz[];
        // this.category = data as CategoriesByUid;
        // console.log(this.category);
        if (Array.isArray(data) && data.length > 0) {
          const category = data[0];
          this.category = category as CategoriesByUid;
          this.quizzes = category.quizzes as Quiz[];
          this.questions = category.questions as Question[];
          console.log(this.quizzes);
        } else {
          console.log('No category data available');
        }
      }),
    );
  }

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }

  activeQuiz(index: number): void {
    if (this.quizzes && this.quizzes[index]) {
      this.questions = this.quizzes[index].questions || [];
      console.log(this.questions); // Check if questions are populated
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  // protected readonly getAllCategories = getAllCategories;
}
