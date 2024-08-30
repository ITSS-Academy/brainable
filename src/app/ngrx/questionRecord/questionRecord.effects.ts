import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, mergeMap } from 'rxjs';

import * as QuestionRecordActions from './questionRecord.actions';
import { QuestionRecordService } from '../../services/question-record/question-record.service';
import * as ProfileActions from '../profile/profile.actions';

@Injectable()
export class QuestionRecordEffects {
  constructor(
    private actions$: Actions,
    private questionRecordService: QuestionRecordService,
  ) {}

  getQuestionRecordByGameId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionRecordActions.getQuestionRecordByGameId),
      switchMap((action) =>
        this.questionRecordService
          .getQuestionRecordsByGameId(action.idToken, action.gameId)
          .pipe(
            map((questionRecords) =>
              QuestionRecordActions.getQuestionRecordByGameIdSuccess({
                questionRecords,
              }),
            ),
            catchError((errorMessage) =>
              of(
                QuestionRecordActions.getQuestionRecordByGameIdFailure({
                  errorMessage,
                }),
              ),
            ),
          ),
      ),
    ),
  );

  createQuestionRecord = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionRecordActions.createQuestionRecord),
      switchMap((action) => {
        return this.questionRecordService.createQuestionRecord(
          action.idToken,
          action.questionRecord,
        );
      }),
      map(() => {
        return QuestionRecordActions.createQuestionRecordSuccess();
      }),
      catchError((error) => {
        return of(
          QuestionRecordActions.createQuestionRecordFailure({
            errorMessage: error,
          }),
        );
      }),
    );
  });
}
