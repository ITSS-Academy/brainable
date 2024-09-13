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

  constructor(
    private gameService: GameService,
    private socket: Socket,
  ) {
    console.log('GameResultComponent');
    this.gameService.receiveRanking().subscribe((rank) => {
      this.rank = rank;
      console.log('rank', this.rank);
      this.socket.off('sendRanking');
    });
  }
}
