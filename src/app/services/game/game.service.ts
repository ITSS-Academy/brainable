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

  listenForNavigationCountDown(pin: string): void {
    this.socket.on('navigateToCountDown', () => {
      this.router.navigate([`/guest/${pin}/countdown`]);
    });
  }

  showAnswer(pin: string): void {
    console.log('Showing answer');
    this.socket.emit('showAnswer', pin);
    this.router.navigate([`/host/${pin}/answer`]);
  }

  listenForNavigateChooseAnswer(pin: string) {
    console.log('Listening for chooseAnswer', pin);
    this.socket.on('chooseAnswer', () => {
      console.log('Navigating to answer page');
      this.router.navigate([`/guest/${pin}/answer`]);
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
}
