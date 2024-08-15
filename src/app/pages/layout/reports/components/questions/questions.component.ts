import { Component } from '@angular/core';
import { LoginComponent } from '../../../../../components/login/login.component';
import { AnswerStatusBarComponent } from './components/answer-status-bar/answer-status-bar.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { QuestionHeadComponent } from './components/question-head/question-head.component';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    LoginComponent,
    AnswerStatusBarComponent,
    MatCard,
    QuizResultComponent,
    QuestionHeadComponent,
    MatCardContent,
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent {}
