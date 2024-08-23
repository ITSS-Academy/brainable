import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { QuizState } from '../../../ngrx/quiz/quiz.state';
import { FormsModule } from '@angular/forms';
import { LobbyComponent } from './components/lobby/lobby.component';
import { AnswerComponent } from './components/answer/answer.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionResultComponent } from './components/question-result/question-result.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { GameService } from '../../../services/game/game.service';
import { GameState } from '../../../ngrx/game/game.state';
import * as GameActions from '../../../ngrx/game/game.actions';
import * as QuizActions from '../../../ngrx/quiz/quiz.actions';
import { Subscription } from 'rxjs';
import { Question } from '../../../models/question.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    LobbyComponent,
    AnswerComponent,
    QuestionComponent,
    QuestionResultComponent,
    RouterOutlet,
  ],
  templateUrl: './host.component.html',
  styleUrl: './host.component.scss',
})
export class HostComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  totalQuestions: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{ quiz: QuizState; auth: AuthState; game: GameState }>,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    const pin = this.activatedRoute.snapshot.paramMap.get('pin');
    const id = 'b8dd4089-d6bd-4df9-87b0-3dc81518d69d';
    this.store.dispatch(GameActions.storePin({ pin }));
    this.subscription.push(
      this.store.select('auth', 'idToken').subscribe((idToken) => {
        if (idToken) {
          this.store.dispatch(
            QuizActions.getQuizById({ idToken: idToken, id: id }),
          );
        }
      }),
      this.store.select('quiz', 'quiz').subscribe((quiz) => {
        // console.log(quiz);
        if (quiz) {
          this.questions = quiz.questions;
          this.totalQuestions = quiz.totalQuestions;
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
