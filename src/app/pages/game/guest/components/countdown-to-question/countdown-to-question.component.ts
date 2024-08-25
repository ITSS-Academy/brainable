import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { NgClass, NgIf } from '@angular/common';
import { GameService } from '../../../../../services/game/game.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { Subscription } from 'rxjs';
import * as GameActions from '../../../../../ngrx/game/game.actions';

@Component({
  selector: 'app-countdown-to-question',
  standalone: true,
  imports: [MatIcon, MatButton, NgIf, NgClass],
  templateUrl: './countdown-to-question.component.html',
  styleUrl: './countdown-to-question.component.scss',
})
export class CountdownToQuestionComponent implements OnInit {
  countdownNumbers = [3, 2, 1];
  activeNumber = 4;
  showFinalText = false;
  hideCircle = false;
  hiddenNumbers: Set<number> = new Set(); // Track hidden numbers

  subscription: Subscription[] = [];

  pin = '';

  constructor(
    private router: Router,
    private store: Store<{ game: GameState }>,
    private gameService: GameService,
  ) {
    this.store.select('game', 'pin').subscribe((pin) => {
      if (pin) {
        this.pin = pin as string;
      } else {
        this.store.dispatch(GameActions.storePin({ pin: this.pin }));
      }
    });
  }

  ngOnInit() {
    this.gameService.listenForNavigateChooseAnswer(this.pin);
    this.startCountdown();
  }

  startCountdown() {
    let index = 0;
    const countdownInterval = setInterval(() => {
      if (index > 0) {
        this.hiddenNumbers.add(this.countdownNumbers[index - 1]); // Hide the previous number
      }
      this.activeNumber = this.countdownNumbers[index];
      index++;

      if (index === this.countdownNumbers.length) {
        clearInterval(countdownInterval);
        setTimeout(() => {
          this.showFinalText = true;
          this.hideCircle = true; // Hide squares after countdown
        }, 1000);
      }
    }, 1000);
  }
}
