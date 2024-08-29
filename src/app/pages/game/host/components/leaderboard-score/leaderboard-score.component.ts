import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import * as GameActions from '../../../../../ngrx/game/game.actions';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import { Router } from '@angular/router';
import { GameService } from '../../../../../services/game/game.service';
import { Question } from '../../../../../models/question.model';
import { Subscription } from 'rxjs';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';

@Component({
  selector: 'app-leaderboard-score',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './leaderboard-score.component.html',
  styleUrl: './leaderboard-score.component.scss',
})
export class LeaderboardScoreComponent implements OnInit, OnDestroy {
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
    this.gameService.listenForTop10().subscribe((top10) => {
      console.log(top10);
    });
  }

  nextClicked() {
    this.router.navigate([`/host/${this.pin}/question`]);
    this.gameService.nextQuestion(this.pin);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
