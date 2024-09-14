import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { GameService } from '../../../../../services/game/game.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-game-result',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './game-result.component.html',
  styleUrl: './game-result.component.scss',
})
export class GameResultComponent {
  rank!: any;
  // create array of img url
  rankImg = [
    'assets/images/rainbow-diamond.png',
    'assets/images/pearl.png',
    'assets/images/amethyst.png',
    'assets/images/emerald.png',
    'assets/images/ruby.png',
    'assets/images/sapphire.png',
    'assets/images/obsidian.png',
    'assets/images/gold.png',
    'assets/images/silver.png',
    'assets/images/bronze.png',
  ];

  constructor(
    private gameService: GameService,
    private socket: Socket,
  ) {
    console.log('GameResultComponent');
    this.rank = this.gameService.rank;
  }
}
