import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import { Router } from '@angular/router';
import { GameService } from '../../../../../services/game/game.service';

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

  constructor(
    private store: Store<{ game: GameState; quiz: QuizState }>,
    private router: Router,
    private gameService: GameService,
  ) {
    this.subscription.push(
      this.store
        .select('game', 'pin')
        .subscribe((pin) => (this.pin = pin as string)),
    );
  }

  ngOnInit(): void {
    this.gameService.listenForNavigateToNextQuestion(this.pin);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}
