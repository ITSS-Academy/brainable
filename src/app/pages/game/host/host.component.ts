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
import { GameState } from '../../../ngrx/game/game.state';
import * as GameActions from '../../../ngrx/game/game.actions';
import * as QuizActions from '../../../ngrx/quiz/quiz.actions';
import { Subscription } from 'rxjs';
import { Question } from '../../../models/question.model';
import { GameService } from '../../../services/game/game.service';

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
  constructor(
    private store: Store<{ quiz: QuizState; auth: AuthState; game: GameState }>,
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
  ) {}

  ngOnInit(): void {
    const pin = this.activatedRoute.snapshot.paramMap.get('pin');
    this.store.dispatch(GameActions.storePin({ pin: pin }));
  }

  ngOnDestroy(): void {
    this.gameService.leftRoom();
  }
}
