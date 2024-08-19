import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { GameService } from '../../../../../services/game/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waiting',
  standalone: true,
  imports: [],
  templateUrl: './waiting.component.html',
  styleUrl: './waiting.component.scss',
})
export class WaitingComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<{ game: GameState }>,
    private gameService: GameService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.gameService.listenForErrors();

    this.store.select('game', 'pin').subscribe((pin) => {
      if (pin) {
        console.log('Pin:', pin);
        this.gameService.joinRoom(pin, 'mtri');
        this.gameService.listenForNavigation(pin);
      }
    });
  }

  ngOnDestroy(): void {
    this.gameService.disconnect();
  }
}
