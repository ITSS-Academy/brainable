import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import { Router } from '@angular/router';
import { GameService } from '../../../../../services/game/game.service';
import * as GameActions from '../../../../../ngrx/game/game.actions';
import { BackgroundImgState } from '../../../../../ngrx/background-img/background-img.state';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  pin!: string;
  playerAnswer!: number;
  correctAnswer!: number;
  isCorrect!: boolean;
  playerName!: string;

  score = 0;
  time = 0;
  showScore1: number = 0;

  constructor(
    private store: Store<{
      game: GameState;
      quiz: QuizState;
      background: BackgroundImgState;
    }>,
    private gameService: GameService,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {
    this.subscription.push(
      this.store
        .select('game', 'pin')
        .subscribe((pin) => (this.pin = pin as string)),
    );
  }

  backgroundImg$ = this.store.select('background', 'img');

  ngOnInit(): void {
    this.backgroundImg$.subscribe((img) => {
      this.renderer.setStyle(
        this.el.nativeElement.querySelector('#container'),
        'background-image',
        `url(${img})`,
      );
    });
    this.gameService.listenForNavigateToNextQuestion(this.pin);
    this.gameService.listenForNavigateToRanking(this.pin);
    this.subscription.push(
      this.gameService.receiveCorrectAnswer().subscribe((correctAnswer) => {
        if (correctAnswer !== null || correctAnswer !== '') {
          this.correctAnswer = correctAnswer.correctAnswer;
          this.isCorrect = this.playerAnswer === this.correctAnswer;
          if (this.isCorrect) {
            this.store.dispatch(GameActions.incrementScore());
          }
        }
      }),
      this.gameService.receiveScore().subscribe((score) => {
        this.showScore1 = Math.round(score);
      }),

      this.store
        .select('game', 'playerAnswer')
        .subscribe(
          (playerAnswer) => (this.playerAnswer = playerAnswer as number),
        ),
      this.store
        .select('game', 'playerName')
        .subscribe((playerName) => (this.playerName = playerName as string)),
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}
