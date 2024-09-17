import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { Subscription } from 'rxjs';
import { GameService } from '../../../../../services/game/game.service';
import { SendAnswer } from '../../../../../models/game.model';
import * as GameActions from '../../../../../ngrx/game/game.actions';
import { BackgroundImgState } from '../../../../../ngrx/background-img/background-img.state';

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
  playerId = '';
  pin = '';
  isChoosing = false;

  timeElapsed: number = 0;
  intervalId: any;

  score = 0;
  isCheckTime = 0;
  currentQuestion$ = this.store.select('game', 'currentQuestion');

  startTimer(): void {
    this.intervalId = setInterval(() => {
      this.timeElapsed += 10; // Tăng mỗi 10ms
      this.isCheckTime += 10;
    }, 10);
  }

  stopTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  constructor(
    private store: Store<{ game: GameState; background: BackgroundImgState }>,
    private gameService: GameService,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  backgroundImg$ = this.store.select('background', 'img');

  ngOnInit() {
    this.backgroundImg$.subscribe((img) => {
      this.renderer.setStyle(
        this.el.nativeElement.querySelector('#container'),
        'background-image',
        `url(${img})`,
      );
    });
    this.startTimer();

    this.subscription.push(
      this.store.select('game', 'playerName').subscribe((playerName) => {
        this.playerName = playerName;
      }),
      this.store.select('game', 'clientId').subscribe((playerId) => {
        this.playerId = playerId;
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
      this.gameService.listenForReceiveQuestion().subscribe((questionId) => {
        this.questionId = questionId;
      }),
    );

    this.gameService.listenForNavigateToResults(this.pin);
  }

  chooseAnswer(answer: number) {
    this.isChoosing = true;
    this.stopTimer();
    this.store.dispatch(GameActions.storePlayerAnswer({ answer }));
    const answerData: SendAnswer = {
      pin: this.pin,
      questionId: this.questionId,
      playerName: this.playerId as string,
      answer: answer as number,
      time: this.timeElapsed,
    };
    if (this.isCheckTime < 1000) {
      setTimeout(() => {
        this.gameService.sendAnswer(answerData);
      }, 1000 - this.isCheckTime);
    } else {
      this.gameService.sendAnswer(answerData);
    }
  }

  ngOnDestroy() {
    if (!this.isChoosing) {
      this.chooseAnswer(0);
    }
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
