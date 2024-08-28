import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, mergeMap } from 'rxjs';
import * as QuestionReportActions from './questionReport.action';
import { QuestionReportService } from '../../services/question-report/question-report.service';

@Injectable()
export class QuestionReportEffects {
  constructor(
    private actions$: Actions,
    private questionReportService: QuestionReportService
  ) {}

  getQuestionReports$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionReportActions.getQuestionReportsByGameId),
      switchMap((action) => {
        return this.questionReportService.getQuestionReportsByGameId(
          action.idToken,
          action.gameId
        );
      }),
      map((questionRecords) => {
        return QuestionReportActions.getQuestionReportsByGameIdSuccess({
          questionRecords,
        });
      }),
      catchError((error) => {
        return of(
          QuestionReportActions.getQuestionReportsByGameIdFailure({
            errorMessage: error,
          })
        );
      })
    );
  });

  createQuestionRecord$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionReportActions.createQuestionRecord),
      switchMap((action) => {
        return this.questionReportService.createQuestionRecord(
          action.idToken,
          action.questionRecord
        );
      }),
      map(() => {
        return QuestionReportActions.createQuestionRecordSuccess();
      }),
      catchError((error) => {
        return of(
          QuestionReportActions.createQuestionRecordFailure({
            errorMessage: error,
          })
        );
      })
    );
  });
}
