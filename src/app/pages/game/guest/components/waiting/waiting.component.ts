import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { GameService } from '../../../../../services/game/game.service';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import * as GameActions from '../../../../../ngrx/game/game.actions';
import emojiRegex from 'emoji-regex';

@Component({
  selector: 'app-waiting',
  standalone: true,
  imports: [FormsModule, MatButton],
  templateUrl: './waiting.component.html',
  styleUrl: './waiting.component.scss',
})
export class WaitingComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  nickname: string = '';
  pin!: string;
  isJoining: boolean = false;
  isEmptyInput = false;

  constructor(
    private store: Store<{ game: GameState }>,
    private gameService: GameService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('game', 'pin').subscribe((pin) => {
        if (pin) {
          if (pin) {
            console.log('123123');
            this.pin = pin as string;
            this.gameService.listenForNavigationCountDown(this.pin);
            this.gameService.checkRoomExist(this.pin);
            this.gameService.listenForNavigateToEnterName(this.pin);
          }
        }
      }),
    );
  }

  convertToUnicode(input: string): string {
    return Array.from(input)
      .map((char) => {
        const code = char.codePointAt(0);
        return code ? code.toString(16) : char;
      })
      .join('');
  }

  unicodeToIcon(unicode: string): string {
    const codePoint = parseInt(unicode.replace(/\\u{|}/g, ''), 16);
    return String.fromCodePoint(codePoint);
  }

  joinGame(): void {
    // let regex = emojiRegex();
    //
    // let arr = this.nickname.split(' ');
    // console.log(arr);
    // for (let i = 0; i < arr.length; i++) {
    //   console.log(arr[i]);
    //   if (arr[i].match(regex)) {
    //     console.log('i', i);
    //     arr[i] = this.convertToUnicode(arr[i]);
    //     console.log(i);
    //   }
    // }
    //
    // console.log(this.unicodeToIcon(arr[0]));
    // console.log(arr.join(' '));

    // if (this.nickname.match(regex)) {
    //   alert('Please enter a valid nickname');
    //   return;
    // }

    if (this.nickname.length == 0) {
      this.isEmptyInput = !this.isEmptyInput;
    } else {
      this.gameService.joinRoom(this.pin, this.nickname);
      this.store.dispatch(
        GameActions.storePlayerName({ playerName: this.nickname }),
      );
      this.gameService.listenForErrors().subscribe((error) => {
        console.log(error);
        if (error === 'Username already exists in the room') {
          alert('Username already exists in the room');
        }
      });
    }
    this.gameService.listenForClientGuessJoined().subscribe((data) => {
      if (data == 'Guest joined room') {
        this.isJoining = true;
      }
    });
  }

  onKey(event: any) {
    if (event.key === 'Enter') {
      this.joinGame();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
