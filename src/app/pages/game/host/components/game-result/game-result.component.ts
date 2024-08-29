import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { GameService } from '../../../../../services/game/game.service';

@Component({
  selector: 'app-game-result',
  standalone: true,
  imports: [MatButton],
  templateUrl: './game-result.component.html',
  styleUrl: './game-result.component.scss',
})
export class GameResultComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private gameService: GameService,
  ) {
    this.playMusic();
  }

  result: {
    playerName: string;
    score: number;
  }[] = [];

  ngOnInit() {
    this.gameService.receiveLeaderboard().subscribe((data) => {
      this.result = data;
      console.log(this.result);
    });
  }

  song = new Audio();

  playMusic() {
    this.song.src = 'assets/music/top3.mp3';
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
