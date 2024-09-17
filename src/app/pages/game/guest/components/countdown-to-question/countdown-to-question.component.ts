import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { NgClass, NgIf } from '@angular/common';
import { GameService } from '../../../../../services/game/game.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { Subscription } from 'rxjs';
import * as GameActions from '../../../../../ngrx/game/game.actions';
import { BackgroundImgState } from '../../../../../ngrx/background-img/background-img.state';

@Component({
  selector: 'app-countdown-to-question',
  standalone: true,
  imports: [MatIcon, MatButton, NgIf, NgClass],
  templateUrl: './countdown-to-question.component.html',
  styleUrl: './countdown-to-question.component.scss',
})
export class CountdownToQuestionComponent implements OnInit, OnDestroy {
  countdownNumbers = [3, 2, 1, 0];
  activeNumber = 4;
  showFinalText = false;
  hideCircle = false;
  hiddenNumbers: Set<number> = new Set(); // Track hidden numbers
  subscription: Subscription[] = [];
  pin!: string;

  playerName = '';
  score = 0;
  countdownInterval: any;

  constructor(
    private router: Router,
    private store: Store<{ game: GameState; background: BackgroundImgState }>,
    private gameService: GameService,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {
    this.subscription.push(
      this.store.select('game', 'pin').subscribe((pin) => {
        if (pin) {
          this.pin = pin as string;
        } else {
          this.store.dispatch(GameActions.storePin({ pin: this.pin }));
        }
      }),
      this.store.select('game', 'playerName').subscribe((playerName) => {
        this.playerName = playerName as string;
      }),
    );
  }

  backgroundImg$ = this.store.select('background', 'img');

  ngOnInit() {
    this.backgroundImg$.subscribe((img) => {
      this.renderer.setStyle(
        this.el.nativeElement.querySelector('#container'),
        'background-image',
        `url(${img})`,
      );
    });
    this.gameService.listenForNavigateChooseAnswer(this.pin);
    this.startCountdown();
    this.subscription.push(
      this.store.select('game', 'pin').subscribe((pin) => {
        if (pin) {
          this.pin = pin;
        }
      }),
    );
  }

  startCountdown() {
    let index = 0;
    this.countdownInterval = setInterval(() => {
      if (index > 0) {
        this.hiddenNumbers.add(this.countdownNumbers[index - 1]); // Hide the previous number
      }
      this.activeNumber = this.countdownNumbers[index];
      index++;

      if (index === this.countdownNumbers.length) {
        setTimeout(() => {
          this.showFinalText = true;
          this.hideCircle = true;
          this.router.navigate([`/guest/${this.pin}/answer`]); // Hide squares after countdown
        }, 1000);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
    clearInterval(this.countdownInterval);
  }
}
