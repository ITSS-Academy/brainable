import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { GameState } from '../../../../../ngrx/game/game.state';
import { Store } from '@ngrx/store';
import * as GameActions from '../../../../../ngrx/game/game.actions';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [SharedModule, NgIf, NgForOf],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent implements OnInit, OnDestroy {
  countdownNumbers = [3, 2, 1];
  activeNumber = 3;
  showFinalText = false;
  hideSquares = false;
  hiddenNumbers: Set<number> = new Set(); // Track hidden numbers
  pin!: string;
  isMusicPlaying = true;

  constructor(
    private router: Router,
    private store: Store<{ game: GameState }>,
  ) {}

  ngOnInit() {
    this.startCountdown();
    this.store.select('game', 'pin').subscribe((pin) => {
      if (pin) {
        this.pin = pin as string;
      } else {
        this.store.dispatch(GameActions.storePin({ pin: this.pin }));
      }
    });
  }

  startCountdown() {
    let index = 0;
    const countdownInterval = setInterval(() => {
      if (index > 0) {
        this.hiddenNumbers.add(this.countdownNumbers[index - 1]); // Hide the previous number
        this.pauseMusic(); // Pause music before moving to the next number
      }
      this.activeNumber = this.countdownNumbers[index];
      this.playMusic(); // Start music at the beginning of each countdown interval
      index++;

      if (index === this.countdownNumbers.length) {
        clearInterval(countdownInterval);
        setTimeout(() => {
          this.showFinalText = true;
          this.hideSquares = true; // Hide squares after countdown
          this.router.navigate([`/host/${this.pin}/question`]);
        }, 1000);
      }
    }, 1000);
  }

  getClass(number: number): { [key: string]: boolean } {
    return {
      [`active-${number}`]: this.activeNumber === number,
      hidden: this.hideSquares || this.hiddenNumbers.has(number),
      active: this.activeNumber === number && !this.hiddenNumbers.has(number), // Add active class
    };
  }

  song = new Audio();

  playMusic() {
    this.song.src = 'assets/music/countdown.mp3';
    this.song.load();
    this.song.play().then();
    this.song.loop = true;
    this.isMusicPlaying = true;
  }

  pauseMusic() {
    this.song.pause();
    this.isMusicPlaying = false;
  }

  ngOnDestroy() {
    this.pauseMusic();
  }
}
