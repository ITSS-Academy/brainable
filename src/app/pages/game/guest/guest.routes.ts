import { GuestComponent } from './guest.component';
import { Routes } from '@angular/router';
import { WaitingComponent } from './components/waiting/waiting.component';
import { AnswerComponent } from './components/answer/answer.component';
import { ResultComponent } from './components/result/result.component';
import {CountdownComponent} from "./components/countdown/countdown.component";
import {CountdownToQuestionComponent} from "./components/countdown-to-question/countdown-to-question.component";

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
      {
        path: 'countdown',
        component: CountdownComponent,
      },
      {
        path: 'countdown-to-question',
        component: CountdownToQuestionComponent
      }
    ],
  },
];
