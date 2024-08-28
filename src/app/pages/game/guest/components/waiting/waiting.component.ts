import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { GameService } from '../../../../../services/game/game.service';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import * as GameActions from '../../../../../ngrx/game/game.actions';

@Component({
  selector: 'app-waiting',
  standalone: true,
  imports: [FormsModule, MatButton],
  templateUrl: './waiting.component.html',
  styleUrl: './waiting.component.scss',
})
export class WaitingComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  nickname: string = '';
  pin!: string;
  isJoining: boolean = false;
  isEmptyInput = false;

  constructor(
    private store: Store<{ game: GameState }>,
    private gameService: GameService,
  ) {}

  ngOnInit(): void {
    this.gameService.listenForNavigationCountDown(this.pin);
    this.subscriptions.push(
      this.store.select('game', 'pin').subscribe((pin) => {
        if (pin) {
          if (pin) {
            this.pin = pin as string;
          } else {
            this.store.dispatch(GameActions.storePin({ pin: this.pin }));
          }
        }
      }),
    );
  }

  joinGame(): void {
    if (this.nickname.length == 0) {
      this.isEmptyInput = !this.isEmptyInput;
    } else {
      this.gameService.joinRoom(this.pin, this.nickname);
      this.store.dispatch(
        GameActions.storePlayerName({ playerName: this.nickname }),
      );
      this.isJoining = true;
    }
  }

  onKey(event: any) {
    if (event.key === 'Enter') {
      this.joinGame();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
