import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../../ngrx/game/game.state';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as GameActions from '../../../../../ngrx/game/game.actions';
import { QuizState } from '../../../../../ngrx/quiz/quiz.state';
import { Question } from '../../../../../models/question.model';
import { GameService } from '../../../../../services/game/game.service';
import { AnswerStatistics } from '../../../../../models/game.model';
import { NgClass, NgIf } from '@angular/common';
import { QuestionRecordState } from '../../../../../ngrx/questionRecord/questionRecord.state';
import { QuestionRecordDTO } from '../../../../../models/questionRecord.model';

@Component({
  selector: 'app-question-result',
  standalone: true,
  imports: [MatButton, MatIcon, NgIf, NgClass],
  templateUrl: './question-result.component.html',
  styleUrl: './question-result.component.scss',
})
export class QuestionResultComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  pin!: string;
  questions: Question[] = [];
  currentQuestion = 0;
  totalQuestions!: number;
  answerStatistics!: AnswerStatistics;
  correctAnswer!: number;

  questionRecord: QuestionRecordDTO = {
    questionRecord: {
      gameId: '',
      question: <Question>{},
      countA: 0,
      countB: 0,
      countC: 0,
      countD: 0,
    },
  };

  constructor(
    private store: Store<{
      game: GameState;
      quiz: QuizState;
      questionRecord: QuestionRecordState;
    }>,
    private router: Router,
    private gameService: GameService,
  ) {
    this.subscription.push(
      this.store
        .select('game', 'pin')
        .subscribe((pin) => (this.pin = pin as string)),
      this.store.select('quiz', 'quiz').subscribe((quiz) => {
        this.questions = quiz.questions;
        this.totalQuestions = quiz.questions.length;
      }),
      this.store
        .select('game', 'currentQuestion')
        .subscribe((currentQuestion) => {
          this.currentQuestion = currentQuestion as number;
          this.questionRecord.questionRecord.question =
            this.questions[currentQuestion];
        }),
    );
  }

  ngOnInit(): void {
    this.gameService.showResults(
      this.pin,
      this.questions[this.currentQuestion].id,
    );
    this.gameService.receiveAnswerStatistics().subscribe((statistics) => {
      this.answerStatistics = statistics;
      console.log(this.answerStatistics);
    });
    this.correctAnswer = this.questions[this.currentQuestion].answer;
  }

  nextQuestionClicked() {
    if (this.currentQuestion === this.totalQuestions - 1) {
      this.router.navigate([`/host/${this.pin}/game-result`]);
      this.gameService.endGame(this.pin);
    } else {
      this.store.dispatch(GameActions.nextQuestion());
      this.router.navigate([`/host/${this.pin}/leaderboard-score`]);
      this.gameService.showTop5(this.pin);
    }
  }

  isCorrectAnswer(optionNumber: number): boolean {
    return this.correctAnswer === optionNumber;
  }

  isIncorrectAnswer(optionNumber: number): boolean {
    return this.correctAnswer !== optionNumber;
  }

  calculateHeight(answerCount: number): string {
    const baseHeight = 25; // base height in pixels
    const additionalHeightPerAnswer = 10; // additional height per answer in pixels
    return `${baseHeight + answerCount * additionalHeightPerAnswer}px !important`;
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
