import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';
import {
  AnswerStatistics,
  SendAnswer,
  SendQuestion,
} from '../../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(
    private socket: Socket,
    private router: Router,
  ) {}

  createRoom(pin: string): void {
    this.socket.emit('createRoom', pin);
  }

  joinRoom(pin: string, username: string): void {
    this.socket.emit('joinRoom', { pin, username });
  }

  listenForGuestJoined(): Observable<{ username: string }> {
    return new Observable((observer) => {
      this.socket.on('guestJoined', (guest: any) => {
        observer.next(guest);
      });
    });
  }

  startGame(pin: string): void {
    this.socket.emit('startGame', pin);
  }

  listenForNavigationCountDown(pin: string): void {
    this.socket.on('navigateToCountDown', () => {
      this.router.navigate([`/guest/${pin}/countdown`]);
    });
  }

  showAnswer(pin: string): void {
    this.socket.emit('showAnswer', pin);
    this.router.navigate([`/host/${pin}/answer`]);
  }

  listenForNavigateChooseAnswer(pin: string) {
    this.socket.on('chooseAnswer', () => {
      this.router.navigate([`/guest/${pin}/answer`]);
    });
  }

  sendQuestion(data: SendQuestion): void {
    this.socket.emit('sendQuestion', data);
  }

  listenForReceiveQuestion(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('receiveQuestion', (questionId: string) => {
        observer.next(questionId);
      });
    });
  }

  sendAnswer(data: SendAnswer): void {
    this.socket.emit('sendAnswer', data);
  }

  listenForPlayerSubmittedAnswerAnswer(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('playerSubmittedAnswer', (answer: any) => {
        observer.next(answer);
      });
    });
  }

  nextShowResults(pin: string): void {
    this.socket.emit('nextShowResults', pin);
  }

  listenForNavigateToResults(pin: string): void {
    this.socket.on('navigateToResults', () => {
      this.router.navigate([`/guest/${pin}/result`]);
    });
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
      });
    });
  }

  nextQuestion(pin: string): void {
    this.socket.emit('nextQuestion', pin);
  }

  listenForNavigateToNextQuestion(pin: string): void {
    this.socket.on('navigateToNextQuestion', () => {
      this.router.navigate([`/guest/${pin}/countdown-to-question`]);
    });
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

  listenForNavigateToEndGame(pin: string): void {
    this.socket.on('navigateToEndGame', () => {
      this.router.navigate([`/guest/${pin}/result`]);
    });
  }

  listenForErrors(): void {
    this.socket.on('error', (message: string) => {
      alert(message);
      this.router.navigate(['/join']);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  chooseAnswer(data:any): void {
    this.socket.emit('sendAnswer', data);
  }

  listenForQuestion() {
    return new Observable((observer) => {
      this.socket.on('newQuestion', (question: any) => {
        observer.next(question);
      });
    });
  }

  listenForAnswer() {
    return new Observable((observer) => {
      this.socket.on('answerStatistics', (answer: any) => {
        observer.next(answer);
      });
    });
  }

}
