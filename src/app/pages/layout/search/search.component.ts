import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkFixedSizeVirtualScroll } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';
import { Question } from '../../../models/question.model';
import { Store } from '@ngrx/store';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SearchState } from '../../../ngrx/search/search.state';
import { SearchModel } from '../../../models/search.model';
import {AsyncPipe, NgIf} from '@angular/common';
import {QuizState} from "../../../ngrx/quiz/quiz.state";
import * as QuizActions from "../../../ngrx/quiz/quiz.actions";
import {Quiz} from "../../../models/quiz.model";
import {GetQuizByIdPipe} from "../../../pipes/get-quiz-by-id.pipe";
import * as SearchActions from "../../../ngrx/search/search.actions";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CdkFixedSizeVirtualScroll, MaterialModule, NgIf, GetQuizByIdPipe, AsyncPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  searchResults: SearchModel[] = [];
  questions!: Question[];
  quiz!: Quiz;

  showAnswer: boolean = false;

  constructor(
    private store: Store<{
      search: SearchState;
      quiz: QuizState;
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
      this.store.select('quiz', 'quiz').subscribe((data) => {
        this.quiz = data;
        this.questions = data.questions;
      }
    ));
  }

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }

  activeQuiz(index: number): void {
    const score = this.searchResults[index]._score;
    this.store.dispatch(QuizActions.getQuizById({ id: this.searchResults[index]._id }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(SearchActions.clearSearchResults());

  }
}
