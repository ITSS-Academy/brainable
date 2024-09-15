import { GuestComponent } from './guest.component';
import { Routes } from '@angular/router';
import { WaitingComponent } from './components/waiting/waiting.component';
import { AnswerComponent } from './components/answer/answer.component';
import { ResultComponent } from './components/result/result.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { CountdownToQuestionComponent } from './components/countdown-to-question/countdown-to-question.component';
import { GameResultComponent } from './components/game-result/game-result.component';
import * as AuthGuard from '../../.././guards/auth.guard';

export const GUEST_ROUTERS: Routes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'waiting',
        component: WaitingComponent,
      },
      {
        path: 'answer',
        component: AnswerComponent,
        canActivate: [AuthGuard.canActiveGame],
      },
      {
        path: 'result',
        component: ResultComponent,
        canActivate: [AuthGuard.canActiveGame],
      },
      {
        path: 'countdown',
        component: CountdownComponent,
        canActivate: [AuthGuard.canActiveGame],
      },
      {
        path: 'countdown-to-question',
        component: CountdownToQuestionComponent,
        canActivate: [AuthGuard.canActiveGame],
      },
      {
        path: 'game-result',
        component: GameResultComponent,
        canActivate: [AuthGuard.canActiveGame],
      },
    ],
  },
];
