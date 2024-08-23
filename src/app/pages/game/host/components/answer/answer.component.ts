import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { Subscription } from 'rxjs';
import { Question } from '../../../../../models/question.model';
import { Store } from '@ngrx/store';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import { GameState } from '../../../../../ngrx/game/game.state';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../../../../services/game/game.service';
import * as GameActions from '../../../../../ngrx/game/game.actions';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss',
})
export class AnswerComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  questions: Question[] = [];
  currentQuestion = 0;
  totalQuestions = 0;
  activeNumber!: number;
  pin!: string;

  constructor(
    private store: Store<{ quiz: QuizState; auth: AuthState; game: GameState }>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
  ) {}

  ngOnInit() {
    const pin = this.activatedRoute.snapshot.paramMap.get('pin');
    this.store.dispatch(GameActions.storePin({ pin: pin }));
    this.subscription.push(
      this.store.select('quiz', 'quiz').subscribe((quiz) => {
        this.questions = quiz.questions;
        this.totalQuestions = quiz.totalQuestions;
        this.activeNumber =
          (quiz.questions[this.currentQuestion].timeLimit as number) + 1;
        this.startCountdown(this.activeNumber);
      }),
      this.store.select('game', 'pin').subscribe((pin) => {
        this.pin = pin as string;
      }),
      this.store
        .select('game', 'currentQuestion')
        .subscribe((currentQuestion) => {
          this.currentQuestion = currentQuestion as number;
        }),
    );
  }

  startCountdown(timeLimit: number) {
    let countTime = timeLimit;
    const countdownInterval = setInterval(() => {
      countTime--;
      this.activeNumber = countTime;

      if (countTime < 1) {
        clearInterval(countdownInterval);
        this.router.navigate([`/host/${this.pin}/results`]);
      }
    }, 1000);
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
