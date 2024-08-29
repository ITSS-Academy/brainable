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
import { SearchState } from '../../../ngrx/search/search.state';
import { SearchModel } from '../../../models/search.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CdkFixedSizeVirtualScroll, MaterialModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  searchResults: SearchModel[] = [];
  questions!: Question[];

  showAnswer: boolean = false;

  constructor(
    private store: Store<{
      search: SearchState;
    }>,
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.store.select('search', 'searchResults').subscribe((data) => {
        this.searchResults = data as SearchModel[];
        if (this.searchResults.length > 0) {
          this.activeQuiz(0);
        }
      }),
    );
  }

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }

  activeQuiz(index: number): void {
    const score = this.searchResults[index]._score;
    this.questions = this.searchResults[index]._source.questions;
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
