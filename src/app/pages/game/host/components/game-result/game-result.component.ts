import { Component, OnInit } from '@angular/core';
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
export class GameResultComponent implements OnInit {
  constructor(
    private router: Router,
    private gameService: GameService,
  ) {}

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

  homePage() {
    this.router.navigate(['/home']);
  }
}
