import { GuestComponent } from './guest.component';
import { Routes } from '@angular/router';
import { WaitingComponent } from './components/waiting/waiting.component';
import { AnswerComponent } from './components/answer/answer.component';
import { ResultComponent } from './components/result/result.component';

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
      },
      {
        path: 'result',
        component: ResultComponent,
      },
    ],
  },
];
