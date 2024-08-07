import { QuizComponent } from './quiz.component';
import { Routes } from '@angular/router';

export const QUIZ_ROUTERS: Routes = [
  {
    path: '',
    component: QuizComponent,
    children: [],
  },
];
