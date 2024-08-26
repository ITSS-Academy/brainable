import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';

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

  listenForNavigation(pin: string): void {
    this.socket.on('navigateToQuestion', () => {
      console.log('Navigating to answer page');
      this.router.navigate([`/guest/${pin}/countdown`]);
    });
  }

  listenForErrors(): void {
    this.socket.on('error', (message: string) => {
      alert(message);
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
