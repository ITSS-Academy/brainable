import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, of, map, switchMap } from 'rxjs';

import * as QuizActions from './quiz.actions';
import { QuizService } from '../../services/quiz/quiz.service';

@Injectable()
export class QuizEffects {
  constructor(
    private actions$: Actions,
    private quizService: QuizService,
  ) {}

  getQuiz$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuizActions.getQuiz),
      switchMap((action) => {
        return this.quizService.getQuiz(action.idToken);
      }),
      map((quiz: any) => {
        return QuizActions.getQuizSuccess({ quiz });
      }),
      catchError((error) => {
        return of(QuizActions.getQuizFailure({ errorMessage: error }));
      }),
    );
  });

  createQuiz$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuizActions.createQuiz),
      switchMap((action) => {
        return this.quizService.createQuiz(action.idToken, action.quiz);
      }),
      map(() => {
        return QuizActions.createQuizSuccess();
      }),
      catchError((error) => {
        return of(QuizActions.createQuizFailure({ errorMessage: error }));
      }),
    );
  });
}
