import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { Subscription } from 'rxjs';
import { GameService } from '../../../../../services/game/game.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss',
})
export class LobbyComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  guests: string[] = [];
  isMusicPlaying = true;
  pin: string = '';

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
    this.gameService.listenForErrors();

    this.subscriptions.push(
      this.store.select('game', 'pin').subscribe((pin) => {
        if (pin) {
          console.log('Pin:', pin);

          this.pin = pin;
          this.gameService.createRoom(pin);
          this.gameService.listenForGuestJoined().subscribe((guest) => {
            console.log('Guest joined:', guest);
            this.guests.push(guest.username);
          });
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.gameService.disconnect();
  }

  startGame() {
    console.log('Starting game...');
    this.gameService.startGame(this.pin);
    this.router.navigate([`/host/${this.pin}/countdown`]);
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
