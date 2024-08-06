import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, of, map, switchMap } from 'rxjs';

import * as QuestionActions from './question.actions';
import { QuestionService } from '../../services/question/question.service';

@Injectable()
export class QuestionEffects {
  constructor(
    private actions$: Actions,
    private questionService: QuestionService,
  ) {}

  createQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionActions.createQuestion),
      switchMap((action) => {
        return this.questionService.createQuestion(
          action.idToken,
          action.question,
        );
      }),
      map(() => {
        return QuestionActions.createQuestionSuccess();
      }),
      catchError((error) => {
        return of(
          QuestionActions.createQuestionFailure({ errorMessage: error }),
        );
      }),
    );
  });
}
