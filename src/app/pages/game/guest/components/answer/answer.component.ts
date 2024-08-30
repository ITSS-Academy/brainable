import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { Subscription } from 'rxjs';
import { GameService } from '../../../../../services/game/game.service';
import { SendAnswer } from '../../../../../models/game.model';
import * as GameActions from '../../../../../ngrx/game/game.actions';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss',
})
export class AnswerComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  questionId = '';
  playerName = '';
  pin = '';
  isChoosing = false;

  timeElapsed: number = 0;
  intervalId: any;

  score = 0;

  startTimer(): void {
    this.intervalId = setInterval(() => {
      this.timeElapsed += 1; // Tăng mỗi 10ms
    }, 10);
  }

  stopTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  constructor(
    private store: Store<{ game: GameState }>,
    private gameService: GameService,
  ) {
    this.startTimer();
    this.subscription.push(
      this.store.select('game', 'playerName').subscribe((playerName) => {
        this.playerName = playerName;
      }),
      this.store.select('game', 'pin').subscribe((pin) => {
        if (pin) {
          this.pin = pin as string;
        } else {
          this.store.dispatch(
            GameActions.storePin({ pin: this.pin as string }),
          );
        }
      }),
    );
  }

  ngOnInit() {
    this.gameService.listenForReceiveQuestion().subscribe((questionId) => {
      this.questionId = questionId;
    });
    this.gameService.listenForNavigateToResults(this.pin);
    this.gameService.stopListeningForNavigateToNextQuestion();
  }

  chooseAnswer(answer: number) {
    this.stopTimer();
    this.isChoosing = true;
    this.store.dispatch(GameActions.storePlayerAnswer({ answer }));
    const answerData: SendAnswer = {
      pin: this.pin,
      questionId: this.questionId,
      playerName: this.playerName,
      answer: answer as number,
      time: this.timeElapsed,
    };
    this.store.dispatch(GameActions.storeTime({ time: this.timeElapsed }));
    this.gameService.sendAnswer(answerData);
  }

  ngOnDestroy() {
    if (!this.isChoosing) {
      this.chooseAnswer(0);
    }
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
