import { Routes } from '@angular/router';
import { HostComponent } from './host.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { AnswerComponent } from './components/answer/answer.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionResultComponent } from './components/question-result/question-result.component';
import { CountdownComponent } from './components/countdown/countdown.component';

export const HOST_ROUTERS: Routes = [
  {
    path: '',
    component: HostComponent,
    children: [
      {
        path: 'lobby',
        component: LobbyComponent,
      },
      {
        path: 'answer',
        component: AnswerComponent,
      },
      {
        path: 'question',
        component: QuestionComponent,
      },
      {
        path: 'results',
        component: QuestionResultComponent,
      },
      {
        path: 'countdown',
        component: CountdownComponent,
      },
    ],
  },
];
