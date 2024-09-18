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
import { GameReportState } from '../../../../../ngrx/gameReport/gameReport.state';
import * as GameReportActions from '../../../../../ngrx/gameReport/gameReport.action';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import * as QuestionRecordActions from '../../../../../ngrx/questionRecord/questionRecord.actions';
import { PlayerRecord } from '../../../../../models/playerRecord.model';

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
  gameId!: string;
  idToken!: string;

  questionRecord: QuestionRecordDTO = {
    gameId: '',
    question: <Question>{},
    countA: 0,
    countB: 0,
    countC: 0,
    countD: 0,
  };

  constructor(
    private store: Store<{
      game: GameState;
      quiz: QuizState;
      questionRecord: QuestionRecordState;
      gameReport: GameReportState;
      auth: AuthState;
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
          console.log(currentQuestion);
          this.currentQuestion = currentQuestion as number;
          this.questionRecord.question = this.questions[currentQuestion];
        }),
      this.store.select('gameReport', 'gameId').subscribe((gameId) => {
        this.gameId = gameId as string;
        this.questionRecord.gameId = gameId as string;
      }),
      this.store.select('auth', 'idToken').subscribe((idToken) => {
        this.idToken = idToken as string;
      }),
    );
  }

  ngOnInit(): void {
    this.gameService.showResults(
      this.pin,
      this.questions[this.currentQuestion].id,
    );
    this.questionRecord.question = this.questions[this.currentQuestion];
    this.gameService.receiveAnswerStatistics().subscribe((statistics) => {
      this.answerStatistics = statistics;
      this.questionRecord.countA = this.answerStatistics.answerStatistics['1'];
      this.questionRecord.countB = this.answerStatistics.answerStatistics['2'];
      this.questionRecord.countC = this.answerStatistics.answerStatistics['3'];
      this.questionRecord.countD = this.answerStatistics.answerStatistics['4'];
    });
    this.correctAnswer = this.questions[this.currentQuestion].answer;
  }

  nextQuestionClicked() {
    if (this.currentQuestion === this.totalQuestions - 1) {
      this.router.navigate([`/host/${this.pin}/game-result`]);
      this.gameService.getLastQuestionScore(this.pin, this.gameId);
      this.gameService.endGame(this.pin);
      this.gameService.sendRanking(this.pin);
    } else {
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
    const isLargeScreen = window.innerWidth >= 1921; // Check if the screen is 2k or larger
    const baseHeight = isLargeScreen ? 51 : 25; // Set base height based on screen size
    const additionalHeightPerAnswer = isLargeScreen ? 25 : 10; // Additional height per answer in pixels

    return `${baseHeight + answerCount * additionalHeightPerAnswer}px !important`;
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(
      QuestionRecordActions.createQuestionRecord({
        idToken: this.idToken,
        questionRecord: this.questionRecord,
      }),
    );
    this.questionRecord = {
      gameId: '',
      question: <Question>{},
      countA: 0,
      countB: 0,
      countC: 0,
      countD: 0,
    };
  }
}
