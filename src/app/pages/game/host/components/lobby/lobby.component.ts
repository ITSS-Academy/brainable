import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { Subscription } from 'rxjs';
import { GameService } from '../../../../../services/game/game.service';
import { Router } from '@angular/router';
import * as GameActions from '../../../../../ngrx/game/game.actions';
import { QRCodeModule } from 'angularx-qrcode';
import { QrDialogComponent } from '../qr-dialog/qr-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgClass } from '@angular/common';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import { Quiz } from '../../../../../models/quiz.model';
import * as GameReportActions from '../../../../../ngrx/gameReport/gameReport.action';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import { GameReport } from '../../../../../models/gameReport.model';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [MaterialModule, QRCodeModule, NgClass],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss',
})
export class LobbyComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  guests: any[] = [];
  isMusicPlaying = true;
  pin: string = '';
  qrCodeValue: string = '';
  isQrDialogOpen = false;
  quiz!: Quiz;
  idToken!: string;

  readonly dialog = inject(MatDialog);

  constructor(
    private store: Store<{ game: GameState; quiz: QuizState; auth: AuthState }>,
    private gameService: GameService,
    private router: Router,
  ) {
    this.subscriptions.push(
      this.store.select('auth', 'idToken').subscribe((idToken) => {
        if (idToken) {
          this.idToken = idToken as string;
        }
      }),
      this.store.select('game', 'pin').subscribe((pin) => {
        if (pin) {
          this.pin = pin as string;
          this.qrCodeValue = `https://brainable.io.vn/guest/${this.pin}/waiting`;

          this.gameService.listenForGuestJoined().subscribe((guest) => {
            this.guests.push({
              userName: guest.username,
              playerId: guest.playerId,
            });
          });

          this.gameService.listenForClientGuessLeft().subscribe((guest) => {
            this.gameService.kickPlayer(this.pin, guest.playerId);
            this.guests = this.guests.filter(
              (g) => g.playerId !== guest.playerId,
            );
          });
        }
      }),
      this.store.select('quiz', 'quiz').subscribe((quiz) => {
        this.quiz = quiz;
      }),
    );

    this.playMusic();
  }

  ngOnInit(): void {}

  startGame( ): void {
    if (this.guests.length === 0) {
      // If no players, show a message to the host
      return;

    }


    // If there are players, proceed with starting the game
    this.gameService.startGame(this.pin);
    let newGame: GameReport = {
      id: '',
      quizId: this.quiz,
      createdAt: new Date(),
      gameRecords: [],
      hostId: '',
      index: 0,
      joinCode: this.pin,
      totalQuestions: 0,
    };
    this.store.dispatch(
      GameReportActions.createGameReport({
        idToken: this.idToken,
        gameReport: newGame,
      }),
    );
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



  openQrDialog() {
    const dialogRef = this.dialog.open(QrDialogComponent);
    this.isQrDialogOpen = true;

    dialogRef.afterClosed().subscribe(() => {
      this.isQrDialogOpen = false;
    });
  }

  ngOnDestroy(): void {
    this.gameService.endListeningForClientGuessLeft();
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(
      GameActions.storeTotalPlayers({ totalPlayers: this.guests.length }),
    );
    this.pauseMusic();
  }
}
