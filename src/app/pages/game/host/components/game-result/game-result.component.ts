import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { GameService } from '../../../../../services/game/game.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { GameReportState } from '../../../../../ngrx/gameReport/gameReport.state';
import { PlayerRecord } from '../../../../../models/playerRecord.model';
import * as PlayerRecordActions from '../../../../../ngrx/playerRecord/playerRecord.action';
import { AuthState } from '../../../../../ngrx/auth/auth.state';

@Component({
  selector: 'app-game-result',
  standalone: true,
  imports: [MatButton],
  templateUrl: './game-result.component.html',
  styleUrl: './game-result.component.scss',
})
export class GameResultComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  pin!: string;
  gameId!: string;

  playerRecords: PlayerRecord[] = [];
  idToken!: string;

  constructor(
    private router: Router,
    private gameService: GameService,
    private store: Store<{
      game: GameState;
      gameReport: GameReportState;
      auth: AuthState;
    }>,
  ) {
    this.subscription.push(
      this.store.select('game', 'pin').subscribe((pin) => {
        this.pin = pin as string;
      }),
      this.store.select('gameReport', 'gameId').subscribe((gameId) => {
        this.gameId = gameId as string;
      }),
      this.store.select('auth', 'idToken').subscribe((tokenId) => {
        this.idToken = tokenId as string;
      }),
    );
    this.playMusic();
  }

  result: {
    playerName: string;
    score: number;
  }[] = [];

  showConfetti = false;

  ngOnInit() {
    this.gameService.receiveLastQuestionScore().subscribe((data) => {
      this.playerRecords = data as PlayerRecord[];
      this.store.dispatch(
        PlayerRecordActions.createPlayerRecord({
          idToken: this.idToken,
          playerRecord: this.playerRecords,
        }),
      );
    });
    this.gameService.receiveLeaderboard().subscribe((data) => {
      this.result = data;
    });
    setTimeout(() => {
      this.showConfetti = true;
    }, 14000);
  }

  song = new Audio();

  playMusic() {
    this.song.src = 'assets/music/top3-leaderboard.mp3';
    this.song.load();
    this.song.play().then();
    this.song.loop = true;
  }

  pauseMusic() {
    this.song.pause();
  }

  homePage() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    this.pauseMusic();
  }
}
