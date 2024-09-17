import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';
import {
  AnswerStatistics,
  SendAnswer,
  SendQuestion,
} from '../../models/game.model';

import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GameReport } from '../../models/gameReport.model';
import * as GameActions from '../../ngrx/game/game.actions';
import { Store } from '@ngrx/store';
import { GameState } from '../../ngrx/game/game.state';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(
    private socket: Socket,
    private router: Router,
    private http: HttpClient,
    private store: Store<{ game: GameState }>,
  ) {}

  rank!: any;

  createGame(idToken: string, gameReport: GameReport) {
    return this.http.post(
      `${environment.apiUrl}/game`,
      { game: gameReport },
      {
        headers: {
          Authorization: idToken,
        },
      },
    );
  }

  getGamesByUser(idToken: string): Observable<GameReport[]> {
    return this.http.get<GameReport[]>(`${environment.apiUrl}/game`, {
      headers: {
        Authorization: idToken,
      },
    });
  }

  getGameById(idToken: string, gameId: string): Observable<GameReport> {
    return this.http.get<GameReport>(
      `${environment.apiUrl}/game/byId?id=${gameId}`,
      {
        headers: {
          Authorization: idToken,
        },
      },
    );
  }

  createRoom(pin: string): void {
    this.socket.emit('createRoom', pin);
  }

  joinRoom(pin: string, username: string): void {
    this.socket.emit('joinRoom', { pin, username });
  }

  checkRoomExist(pin: string): void {
    this.socket.emit('checkRoomExist', pin);
  }

  listenForNavigateToEnterName(pin: string): void {
    this.socket.on('navigateToEnterName', (clientId: string) => {
      this.store.dispatch(GameActions.storeClientId({ clientId: clientId }));
      this.store.select('game', 'clientId').subscribe((clientId) => {});
      this.store.dispatch(GameActions.storePin({ pin: pin }));
      this.router.navigate([`/guest/${pin}/waiting`]).then(() => {
        this.socket.off('navigateToEnterName');
      });
    });
  }

  listenForGuestJoined(): Observable<{ username: string; playerId: string }> {
    return new Observable((observer) => {
      this.socket.on('guestJoined', (guest: any) => {
        observer.next(guest);
      });
    });
  }

  listenForClientGuessJoined(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('clientGuessJoined', (guest: any) => {
        observer.next(guest);
      });
    });
  }

  listenForClientGuessLeft(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('guestLeft', (guest: string) => {
        observer.next(guest);
      });
    });
  }

  kickPlayer(pin: string, playerId: string): void {
    this.socket.emit('kickPlayer', { pin, playerId });
  }

  endListeningForClientGuessLeft(): void {
    this.socket.off('guestLeft');
  }

  startGame(pin: string): void {
    this.socket.emit('startGame', pin);
  }

  listenForNavigationCountDown(pin: string): void {
    this.socket.on('navigateToCountDown', () => {
      this.router.navigate([`/guest/${pin}/countdown`]).then(() => {
        this.socket.off('navigateToCountDown');
      });
    });
  }



  listenForNavigateChooseAnswer(pin: string) {
    this.socket.on('chooseAnswer', () => {
      this.router.navigate([`/guest/${pin}/answer`]).then(() => {
        this.socket.off('chooseAnswer');
      });
    });
  }

  endListeningForChooseAnswer(): void {
    this.socket.off('chooseAnswer');
  }

  listenForNavigateToResults(pin: string): void {
    this.socket.on('navigateToResults', () => {
      this.router.navigate([`/guest/${pin}/result`]).then(() => {
        this.socket.off('navigateToResults');
      });
    });
  }

  listenForNavigateToNextQuestion(pin: string): void {
    this.socket.on('navigateToNextQuestion', () => {
      this.router.navigate([`/guest/${pin}/countdown-to-question`]).then(() => {
        this.socket.off('navigateToNextQuestion');
      });
    });
  }

  showAnswer(pin: string): void {
    this.socket.emit('showAnswer', pin);
    this.router.navigate([`/host/${pin}/answer`]);
  }

  sendQuestion(data: SendQuestion): void {
    this.socket.emit('sendQuestion', data);
  }

  listenForReceiveQuestion(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('receiveQuestion', (questionId: string) => {
        observer.next(questionId);
        observer.complete();
      });
    });
  }

  sendAnswer(data: SendAnswer): void {
    this.socket.emit('sendAnswer', data);
  }

  listenForPlayerSubmittedAnswer(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('playerSubmittedAnswer', (answer: any) => {
        observer.next(answer);
      });
    });
  }

  nextShowResults(pin: string): void {
    this.socket.emit('nextShowResults', pin);
  }

  showResults(pin: string, questionId: string): void {
    this.socket.emit('showResults', { pin, questionId });
  }

  receiveAnswerStatistics(): Observable<AnswerStatistics> {
    return new Observable((observer) => {
      this.socket.on('answerStatistics', (answerStatistics: any) => {
        observer.next(answerStatistics);
      });
    });
  }

  receiveCorrectAnswer(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('correctAnswer', (correctAnswer: any) => {
        observer.next(correctAnswer);
        observer.complete();
      });
    });
  }

  receiveScore(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('showScore', (score: any) => {
        observer.next(score);
      });
    });
  }

  nextQuestion(pin: string): void {
    this.socket.emit('nextQuestion', pin);
  }

  endGame(pin: string): void {
    this.socket.emit('endGame', pin);
  }

  receiveLeaderboard(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('questionList', (leaderboard: any) => {
        observer.next(leaderboard);
      });
    });
  }

  listenForErrors(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('error', (error: any) => {
        observer.next(error);
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  showTop5(pin: string): void {
    this.socket.emit('showTop5', pin);
  }

  listenForTop5(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('leaderboardTop5', (top5: any) => {
        observer.next(top5);
      });
    });
  }

  getLastQuestionScore(pin: string, gameId: string) {
    this.socket.emit('getLastQuestionScore', { pin, gameId });
  }

  sendRanking(pin: string): void {
    this.socket.emit('sendRanking', pin);
  }

  listenForNavigateToRanking(pin: string) {
    this.socket.on('sendRanking', (rank: any) => {
      this.rank = rank;
      this.router.navigate([`/guest/${pin}/game-result`]).then(() => {
        this.socket.off('sendRanking');
      });
    });
  }

  // receiveRanking(): Observable<any> {
  //   return new Observable((observer) => {
  //     this.socket.on('sendRanking', (rank: any) => {
  //       observer.next(rank);
  //       observer.complete();
  //     });
  //   });
  // }

  receiveLastQuestionScore(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('lastQuestionScore', (lastQuestionScore: any) => {
        observer.next(lastQuestionScore);
      });
    });
  }

  logout(): void {
    this.socket.emit('logout');
  }
}
