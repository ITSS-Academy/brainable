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
    this.playMusic();

    document.addEventListener('click', this.playMusic.bind(this), {
      once: true,
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('game', 'pin').subscribe((pin) => {
        if (pin) {
          this.pin = pin as string;
          this.gameService.listenForGuestJoined().subscribe((guest) => {
            this.guests.push(guest.username);
          });
        } else {
          this.store.dispatch(GameActions.storePin({ pin: this.pin }));
        }
      }),
    );

    this.qrCodeValue = `http://localhost:4200/guest/${this.pin}/waiting`;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  startGame() {
    console.log('Starting game...');
    this.gameService.startGame(this.pin);
    this.router.navigate([` / host /${this.pin}/countdown`]);
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
}
