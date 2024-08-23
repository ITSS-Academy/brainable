import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as GameActions from '../../../../../ngrx/game/game.actions';

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

  constructor(
    private store: Store<{ game: GameState }>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.store
        .select('game', 'pin')
        .subscribe((pin) => (this.pin = pin as string)),
    );
  }

  nextQuestionClicked() {
    this.store.dispatch(GameActions.nextQuestion());
    this.router.navigate([`/host/${this.pin}/question`]);
  }
}
