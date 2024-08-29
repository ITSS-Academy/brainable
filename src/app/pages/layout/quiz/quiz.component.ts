import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { QuizDetailComponent } from './components/quiz-detail/quiz-detail.component';
import {
  CdkFixedSizeVirtualScroll,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { QuizState } from '../../../ngrx/quiz/quiz.state';
import * as QuizActions from '../../../ngrx/quiz/quiz.actions';
import { Quiz } from '../../../models/quiz.model';
import { LoadingComponent } from '../../loading/loading.component';
import { LocalTimePipe } from '../../../shared/pipes/local-time.pipe';
import { GameState } from '../../../ngrx/game/game.state';
import * as GameActions from '../../../ngrx/game/game.actions';
import { GameService } from '../../../services/game/game.service';
import { GameReport } from '../../../models/gameReport.model';
import * as GameReportActions from '../../../ngrx/gameReport/gameReport.action';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    QuizDetailComponent,
    ScrollingModule,
    CdkFixedSizeVirtualScroll,
    LoadingComponent,
    LocalTimePipe,
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  showAnswer: boolean = false;
  quizId!: string;
  quiz!: Quiz;
  idToken!: string;
  isGettingQuizSuccess$ = this.store.select('quiz', 'isGetQuizByIdSuccessful');

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{ auth: AuthState; quiz: QuizState; game: GameState }>,
    private gameService: GameService,
    private router: Router,
  ) {
    this.quizId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.subscription.push(
      this.store.select('auth', 'idToken').subscribe((idToken) => {
        if (idToken) {
          this.idToken = idToken;
          this.store.dispatch(
            QuizActions.getQuizById({ idToken: idToken, id: this.quizId }),
          );
        }
      }),
      this.store.select('quiz', 'quiz').subscribe((quiz) => {
        if (quiz) {
          this.quiz = quiz;
        }
      }),
    );
  }

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }

  playGame() {
    const pin = this.generatePin();
    this.store.dispatch(GameActions.storePin({ pin }));
    this.store.dispatch(QuizActions.storeCurrentQuiz({ quiz: this.quiz }));
    this.store.dispatch(
      GameActions.storeTotalQuestions({
        totalQuestions: this.quiz.questions.length,
      }),
    );

    this.gameService.createRoom(pin);
    this.router.navigate([`/host/${pin}/lobby`]);

    let newGame: GameReport = {
      id: '',
      quizId: this.quiz,
      createdAt: new Date(),
      gameRecords: [],
      hostId: '',
      index: 0,
      joinCode: pin,
      totalQuestions: 0,
    };
    this.store.dispatch(
      GameReportActions.createGameReport({
        idToken: this.idToken,
        gameReport: newGame,
      }),
    );
  }

  generatePin(): string {
    let pin = '';
    for (let i = 0; i < 6; i++) {
      pin += Math.floor(Math.random() * 10).toString();
    }
    return pin;
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
