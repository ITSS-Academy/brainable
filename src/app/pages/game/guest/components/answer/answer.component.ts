import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { GameService } from '../../../../../services/game/game.service';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss',
})
export class AnswerComponent implements OnInit {
  constructor(private gameService: GameService, private store: Store<{game: GameState}>) {}

  pin!: string;
  subscription: Subscription[] = [];

  ngOnInit() {
    this.subscription.push(
      this.store.select('game', 'pin').subscribe((pin) => {
        if (pin) {
          this.pin = pin;
        }
      }),
    );
    this.gameService.listenForQuestion().subscribe((question) => {
      console.log('Question:', question);
    });
  }

  answersForRender = [
    {
      id:1,
      class: "answer red",
      fontIcon: "play_arrow"  
    },
    {
      id:2,
      class: "answer blue",
      fontIcon: "square"  
    },
    {
      id:3,
      class: "answer green",
      fontIcon: "circle"  
    },
    {
      id:4,
      class: "answer yellow",
      fontIcon: "square"  
    }
  ]

  chooseAnswer(id: number) {
    console.log('Answer chosen:', id);
    
    let data = {
      pin: this.pin,
      questionId: "",
      playerName: 'Guest 1',
      answer: id
    }

    this.gameService.chooseAnswer(data);
  }
}
