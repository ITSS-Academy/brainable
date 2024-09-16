import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { Subscription } from 'rxjs';
import { GameService } from '../../../../../services/game/game.service';
import { Router } from '@angular/router';
import * as GameActions from '../../../../../ngrx/game/game.actions';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [MaterialModule, QRCodeModule],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss',
})
export class LobbyComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  guests: string[] = [];
  isMusicPlaying = true;
  pin: string = '';
  qrCodeValue: string = '';

  constructor(
    private store: Store<{ game: GameState }>,
    private gameService: GameService,
    private router: Router,
  ) {
    this.subscriptions.push(
      this.store.select('game', 'pin').subscribe((pin) => {
        if (pin) {
          this.pin = pin as string;
          this.qrCodeValue = `https://brainable.io.vn/guest/${this.pin}/waiting`;

          this.gameService.listenForGuestJoined().subscribe((guest) => {
            this.guests.push(guest.username);
          });
        }
      }),
    );

    this.playMusic();

    // document.addEventListener('click', this.playMusic.bind(this), {
    //   once: true,
    // });
  }

  ngOnInit(): void {}

  startGame( ): void {
    if (this.guests.length === 0) {
      // If no players, show a message to the host
      return;

    }


    // If there are players, proceed with starting the game
    this.gameService.startGame(this.pin);
    this.router.navigate([`/host/${this.pin}/countdown`]);
  }

  dissableStartButton(): boolean {
    return this.guests.length === 0
  }


  song = new Audio();

  playMusic() {
    this.song.src = 'assets/music/lobby.mp3';
    this.song.load();
    this.song.play().then();
    this.song.loop = true;
    this.isMusicPlaying = true;
  }

  pauseMusic() {
    this.song.pause();
    this.isMusicPlaying = false;
  }

  volume(vl: any) {
    this.song.volume = vl.target.value;
  }



  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(
      GameActions.storeTotalPlayers({ totalPlayers: this.guests.length }),
    );
    this.pauseMusic();
  }
}
