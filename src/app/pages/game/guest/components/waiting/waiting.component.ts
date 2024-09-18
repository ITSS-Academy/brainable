import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { GameService } from '../../../../../services/game/game.service';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import * as GameActions from '../../../../../ngrx/game/game.actions';
import emojiRegex from 'emoji-regex';
import { AlertService } from '../../../../../services/alert/alert.service';
import { BackgroundImgState } from '../../../../../ngrx/background-img/background-img.state';
import * as BackgroundImgActions from '../../../../../ngrx/background-img/background-img.actions';

@Component({
  selector: 'app-waiting',
  standalone: true,
  imports: [FormsModule, MatButton],
  templateUrl: './waiting.component.html',
  styleUrl: './waiting.component.scss',
})
export class WaitingComponent implements OnInit, OnDestroy, AfterViewInit {
  subscriptions: Subscription[] = [];
  nickname: string = '';
  pin!: string;
  isJoining: boolean = false;
  isEmptyInput = false;

  @ViewChild('containerRef') containerRef!: ElementRef;
  selectedImageIndex: number | null = null;

  imgUrls = 'assets/images/z5714813450402_17d12c1680cfb5a3fede63bf191ee94c.jpg';

  constructor(
    private store: Store<{ game: GameState; background: BackgroundImgState }>,
    private gameService: GameService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('game', 'pin').subscribe((pin) => {
        if (pin) {
          if (pin) {
            this.pin = pin as string;
            this.gameService.listenForNavigationCountDown(this.pin);
            this.gameService.checkRoomExist(this.pin);
            this.gameService.listenForNavigateToEnterName(this.pin);
          }
        }
      }),
    );
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
        if (error === 'Room not found') {
          this.alertService.showAlertError(
            'Room not found',
            'Error',
            3000,
            'start',
            'bottom',
          );
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

  backGroundChange(imageUrl: string, index: number) {
    if (this.containerRef) {
      this.imgUrls = imageUrl;
      this.containerRef.nativeElement.style.backgroundImage = `url('${imageUrl}')`;
      this.containerRef.nativeElement.style.backgroundSize = 'cover';
      this.containerRef.nativeElement.style.backgroundRepeat = 'no-repeat';
      this.containerRef.nativeElement.style.backgroundPosition = 'center';
    }
    this.selectedImageIndex = index;
  }

  ngOnDestroy(): void {
    this.store.dispatch(
      BackgroundImgActions.storeBackgroundImg({ img: this.imgUrls }),
    );
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  @ViewChild('nicknameInput') nicknameInput!: ElementRef;

  ngAfterViewInit() {
    if (!this.isJoining) {
      this.nicknameInput.nativeElement.focus();
    }
  }
}
