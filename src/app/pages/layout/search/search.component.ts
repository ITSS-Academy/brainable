import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkFixedSizeVirtualScroll } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';
import { Question } from '../../../models/question.model';
import { Store } from '@ngrx/store';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SearchState } from '../../../ngrx/search/search.state';
import { SearchModel } from '../../../models/search.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { QuizState } from '../../../ngrx/quiz/quiz.state';
import * as QuizActions from '../../../ngrx/quiz/quiz.actions';
import { Quiz } from '../../../models/quiz.model';
import { GetQuizByIdPipe } from '../../../pipes/get-quiz-by-id.pipe';
import * as SearchActions from '../../../ngrx/search/search.actions';
import * as GameActions from '../../../ngrx/game/game.actions';
import { GameService } from '../../../services/game/game.service';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CdkFixedSizeVirtualScroll,
    MaterialModule,
    NgIf,
    GetQuizByIdPipe,
    AsyncPipe,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  searchResults: SearchModel[] = [];
  questions!: Question[];
  quiz!: Quiz;
  isPlaying: boolean = false;

  showAnswer: boolean = false;

  constructor(
    private store: Store<{
      search: SearchState;
      quiz: QuizState;
    }>,
    private gameService: GameService,
    private router: Router,
    private socket: Socket,
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
        if (this.isPlaying) {
          const pin = this.generatePin();
          this.socket.connect();
          this.store.dispatch(GameActions.storePin({ pin }));
          this.store.dispatch(
            QuizActions.storeCurrentQuiz({ quiz: this.quiz }),
          );
          this.store.dispatch(
            GameActions.storeTotalQuestions({
              totalQuestions: this.quiz.questions.length,
            }),
          );

          this.gameService.createRoom(pin);
          this.router.navigate([`/host/${pin}/lobby`]);
        }
      }),
    );
  }

  playGame(index: number) {
    this.isPlaying = true;
    this.store.dispatch(
      QuizActions.getQuizById({ id: this.searchResults[index]._id }),
    );
  }

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }

  activeQuiz(index: number): void {
    this.store.dispatch(
      QuizActions.getQuizById({ id: this.searchResults[index]._id }),
    );
  }

  generatePin(): string {
    let pin = '';
    for (let i = 0; i < 6; i++) {
      pin += Math.floor(Math.random() * 10).toString();
    }
    return pin;
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(SearchActions.clearSearchResults());
  }
}
