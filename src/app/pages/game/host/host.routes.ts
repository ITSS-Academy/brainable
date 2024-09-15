import { Routes } from '@angular/router';
import { HostComponent } from './host.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { AnswerComponent } from './components/answer/answer.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionResultComponent } from './components/question-result/question-result.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { GameResultComponent } from './components/game-result/game-result.component';
import { LeaderboardScoreComponent } from './components/leaderboard-score/leaderboard-score.component';
import * as AuthGuard from '../../../guards/auth.guard';

export const HOST_ROUTERS: Routes = [
  {
    path: '',
    component: HostComponent,
    children: [
      {
        path: 'lobby',
        component: LobbyComponent,
        canActivate: [AuthGuard.canActiveGame],
      },
      {
        path: 'answer',
        component: AnswerComponent,
        canActivate: [AuthGuard.canActiveGame],
      },
      {
        path: 'question',
        component: QuestionComponent,
        canActivate: [AuthGuard.canActiveGame],
      },
      {
        path: 'question-result',
        component: QuestionResultComponent,
        canActivate: [AuthGuard.canActiveGame],
      },
      {
        path: 'countdown',
        component: CountdownComponent,
        canActivate: [AuthGuard.canActiveGame],
      },
      {
        path: 'game-result',
        component: GameResultComponent,
        canActivate: [AuthGuard.canActiveGame],
      },
      {
        path: 'leaderboard-score',
        component: LeaderboardScoreComponent,
        canActivate: [AuthGuard.canActiveGame],
      },
    ],
  },
];
