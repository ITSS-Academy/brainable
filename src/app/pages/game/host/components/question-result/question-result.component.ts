import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as GameActions from '../../../../../ngrx/game/game.actions';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import { Question } from '../../../../../models/question.model';
import { GameService } from '../../../../../services/game/game.service';

@Component({
  selector: 'app-question-result',
  standalone: true,
  imports: [MatButton, MatIcon],
  templateUrl: './question-result.component.html',
  styleUrl: './question-result.component.scss',
})
export class QuestionResultComponent implements OnInit {
  subscription: Subscription[] = [];
  pin!: string;
  questions: Question[] = [];
  currentQuestion = 0;

  constructor(
    private store: Store<{ game: GameState; quiz: QuizState }>,
    private router: Router,
    private gameService: GameService,
  ) {
    this.subscription.push(
      this.store
        .select('game', 'pin')
        .subscribe((pin) => (this.pin = pin as string)),
      this.store.select('quiz', 'quiz').subscribe((quiz) => {
        this.questions = quiz.questions;
      }),
      this.store
        .select('game', 'currentQuestion')
        .subscribe((currentQuestion) => {
          this.currentQuestion = currentQuestion as number;
        }),
    );
  }

  ngOnInit(): void {}

  nextQuestionClicked() {
    this.store.dispatch(GameActions.nextQuestion());
    this.router.navigate([`/host/${this.pin}/question`]);
    this.gameService.nextQuestion(this.pin);
  }
}
