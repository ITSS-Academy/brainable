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
      ofType(QuizActions.getAllQuiz),
      switchMap((action) => {
        return this.quizService.getQuiz(action.idToken);
      }),
      map((quiz: any) => {
        return QuizActions.getAllQuizSuccess({ quiz });
      }),
      catchError((error) => {
        return of(QuizActions.getAllQuizFailure({ errorMessage: error }));
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

  updateQuiz$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuizActions.updateQuiz),
      switchMap((action) => {
        return this.quizService.updateQuiz(action.idToken, action.quiz);
      }),
      map(() => {
        return QuizActions.updateQuizSuccess();
      }),
      catchError((error) => {
        return of(QuizActions.updateQuizFailure({ errorMessage: error }));
      }),
    );
  });

  getQuizById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuizActions.getQuizById),
      switchMap((action) => {
        return this.quizService.getQuizById(action.idToken, action.id);
      }),
      map((quiz: any) => {
        return QuizActions.getQuizByIdSuccess({ quiz });
      }),
      catchError((error) => {
        return of(QuizActions.getQuizByIdFailure({ errorMessage: error }));
      }),
    );
  });
}
