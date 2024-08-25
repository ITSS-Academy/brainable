import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';
import { SendAnswer, SendQuestion } from '../../models/game.model';

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
    console.log('Listening for chooseAnswer', pin);
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
    console.log('nextShowResults');
    this.socket.emit('nextShowResults', pin);
  }

  listenForNavigateToResults(pin: string): void {
    console.log('Listening for navigateToResults', pin);
    this.socket.on('navigateToResults', () => {
      this.router.navigate([`/guest/${pin}/result`]);
    });
  }

  showResults(pin: string): void {
    this.socket.emit('showResults', pin);
  }

  nextQuestion(pin: string): void {
    this.socket.emit('nextQuestion', pin);
  }

  listenForNavigateToNextQuestion(pin: string): void {
    this.socket.on('navigateToNextQuestion', () => {
      this.router.navigate([`/guest/${pin}/countdown-to-question`]);
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
}
