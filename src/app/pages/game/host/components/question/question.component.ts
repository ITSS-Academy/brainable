import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { Question } from '../../../../../models/question.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import { GameState } from '../../../../../ngrx/game/game.state';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../../../../services/game/game.service';
import * as GameActions from '../../../../../ngrx/game/game.actions';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  questions: Question[] = [];
  currentQuestion = 0;
  totalQuestions = 0;
  pin!: string;
  isMusicPlaying = true;

  progressValue = 0;

  private duration = 4000; // Duration of the animation in milliseconds
  private interval = 50; // Interval between updates in milliseconds

  constructor(
    private store: Store<{ quiz: QuizState; auth: AuthState; game: GameState }>,
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private router: Router,
  ) {}

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

  ngOnInit() {
    this.animateProgress();
    const pin = this.activatedRoute.snapshot.paramMap.get('pin');
    this.store.dispatch(GameActions.storePin({ pin: pin }));
    this.subscription.push(
      this.store.select('quiz', 'quiz').subscribe((quiz) => {
        this.questions = quiz.questions;
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
      this.store
        .select('game', 'totalQuestions')
        .subscribe((totalQuestions) => {
          this.totalQuestions = totalQuestions as number;
        }),
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  animateProgress() {
    const increment = 100 / (this.duration / this.interval); // Calculate increment value

    const intervalId = setInterval(() => {
      if (this.progressValue + increment >= 100) {
        this.progressValue = 100; // Ensure we reach exactly 100%
        clearInterval(intervalId); // Stop the interval when progress reaches 100%
        this.gameService.showAnswer(this.pin);
        // this.router.navigate([`/host/${this.pin}/answer`]);
      } else {
        this.progressValue += increment; // Update progress value
      }
    }, this.interval);
  }
}
