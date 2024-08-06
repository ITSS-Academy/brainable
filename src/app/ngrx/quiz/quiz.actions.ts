import { createAction, props } from '@ngrx/store';
import { Quiz, QuizDTO } from '../../models/quiz.model';

export const getQuiz = createAction(
  '[Quiz] Get Quiz',
  props<{ idToken: string }>(),
);

export const getQuizSuccess = createAction(
  '[Quiz] Get Quiz Success',
  props<{ quiz: Quiz[] }>(),
);

export const getQuizFailure = createAction(
  '[Quiz] Get Quiz Failure',
  props<{ errorMessage: string }>(),
);

export const createQuiz = createAction(
  '[Quiz] Create Quiz',
  props<{ idToken: string; quiz: QuizDTO }>(),
);

export const createQuizSuccess = createAction('[Quiz] Create Quiz Success');

export const createQuizFailure = createAction(
  '[Quiz] Create Quiz Failure',
  props<{ errorMessage: string }>(),
);

export const clearCreateState = createAction('[Quiz] Clear Create State');
