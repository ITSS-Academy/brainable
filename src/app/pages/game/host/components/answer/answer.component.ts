import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { Subscription } from 'rxjs';
import { Question } from '../../../../../models/question.model';
import { Store } from '@ngrx/store';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import { GameState } from '../../../../../ngrx/game/game.state';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../../../../services/game/game.service';
import * as GameActions from '../../../../../ngrx/game/game.actions';
import { SendQuestion } from '../../../../../models/game.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [MaterialModule, NgClass],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss',
})
export class AnswerComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  questions: Question[] = [];
  currentQuestion = 0;
  totalQuestions = 0;
  activeNumber!: number;
  pin!: string;
  isMusicPlaying = true;
  totalPlayers!: number;
  imgUrl =
    'https://firebasestorage.googleapis.com/v0/b/brainable-d5919.appspot.com/o/media.png?alt=media&token=b7bc0b71-587d-4dd3-932f-98ccb390bf6e';
  hideImg = false;

  numOfUserResponses = 0;
  countdownInterval: any; // Store interval ID
  isCountdownFinished = false;

  constructor(
    private store: Store<{ quiz: QuizState; auth: AuthState; game: GameState }>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
  ) {
    this.playMusic();
  }

  ngOnInit() {
    this.gameService.listenForPlayerSubmittedAnswer().subscribe(() => {
      this.numOfUserResponses++;
      if (
        this.numOfUserResponses === this.totalPlayers &&
        !this.isCountdownFinished
      ) {
        clearInterval(this.countdownInterval);
        console.log('All players have answered');

        this.router.navigate([`/host/${this.pin}/question-result`]).then(() => {
          this.gameService.nextShowResults(this.pin);
        });
      }
    });
    const pin = this.activatedRoute.snapshot.paramMap.get('pin');
    this.store.dispatch(GameActions.storePin({ pin: pin }));
    this.subscription.push(
      this.store.select('quiz', 'quiz').subscribe((quiz) => {
        this.questions = quiz.questions;
        this.totalQuestions = quiz.totalQuestions;
        this.activeNumber =
          (quiz.questions[this.currentQuestion].timeLimit as number) + 1;
        this.startCountdown(this.activeNumber);
      }),
      this.store.select('game', 'pin').subscribe((pin) => {
        if (pin) {
          this.pin = pin as string;
        } else {
          this.store.dispatch(GameActions.storePin({ pin: this.pin }));
        }
      }),
      this.store
        .select('game', 'currentQuestion')
        .subscribe((currentQuestion) => {
          this.currentQuestion = currentQuestion as number;
        }),
      this.store.select('game', 'totalPlayers').subscribe((totalPlayers) => {
        this.totalPlayers = totalPlayers as number;
      }),
    );
    //   check pin and currentQuestion !== null
    if (this.pin && this.currentQuestion !== null) {
      const data: SendQuestion = {
        pin: this.pin,
        questionId: this.questions[this.currentQuestion].id,
        correctAnswer: this.questions[this.currentQuestion].answer,
      };
      this.gameService.sendQuestion(data);
    }
    this.imgUrl = this.questions[this.currentQuestion].imgUrl;

    this.imgHandler(this.imgUrl);
  }

  startCountdown(timeLimit: number) {
    let countTime = timeLimit;
    this.countdownInterval = setInterval(() => {
      countTime--;
      this.activeNumber = countTime;

      if (countTime < 1) {
        console.log('Countdown finished');
        clearInterval(this.countdownInterval);
        this.isCountdownFinished = true;
        this.router.navigate([`/host/${this.pin}/question-result`]).then(() => {
          this.gameService.nextShowResults(this.pin);
        });
      }
    }, 1000);
  }

  song = new Audio();

  playMusic() {
    this.song.src = 'assets/music/ingame.mp3';
    this.song.load();
    this.song.play().then();
    this.song.loop = true;
    this.isMusicPlaying = true;
  }

  pauseMusic() {
    this.song.pause();
    this.isMusicPlaying = false;
  }

  imgHandler(imgUrl: string) {
    if (
      this.imgUrl ===
      'https://firebasestorage.googleapis.com/v0/b/brainable-d5919.appspot.com/o/media.png?alt=media&token=b7bc0b71-587d-4dd3-932f-98ccb390bf6e'
    ) {
      this.hideImg = !this.hideImg;
    } else {
      this.hideImg = false;
    }
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
    clearInterval(this.countdownInterval);
    this.pauseMusic();
  }
}
