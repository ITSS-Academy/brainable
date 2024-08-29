import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../../../../components/login/login.component';
import { AnswerStatusBarComponent } from './components/answer-status-bar/answer-status-bar.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { QuestionHeadComponent } from './components/question-head/question-head.component';
import { QuetionReportState } from '../../../../../ngrx/questionReport/questionReport.state';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../../ngrx/auth/auth.state';
import * as QuestionReportActions from '../../../../../ngrx/questionReport/questionReport.action';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { GameReportState } from '../../../../../ngrx/gameReport/gameReport.state';

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
    AsyncPipe,
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent implements OnInit {
  questionReport$ = this.store.select('questionReport');

  constructor(
    private store: Store<{
      auth: AuthState;
      questionReport: QuetionReportState;
      gameReport: GameReportState;
    }>,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.store.select('auth', 'idToken').subscribe((idToken) => {
      if (idToken) {
        this.store.dispatch(
          QuestionReportActions.getQuestionReportsByGameId({
            idToken,
            gameId: id,
          }),
        );
        this.questionReport$.subscribe((questionReport) => {});
      }
    });
  }
}
