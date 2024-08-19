import { createAction, props } from '@ngrx/store';
import { Quiz, QuizDTO } from '../../models/quiz.model';
import { Question } from '../../models/question.model';

export const getAllQuiz = createAction(
  '[Quiz] Get All Quiz',
  props<{ idToken: string }>(),
);

export const getAllQuizSuccess = createAction(
  '[Quiz] Get All Quiz Success',
  props<{ quiz: Quiz[] }>(),
);

export const getAllQuizFailure = createAction(
  '[Quiz] Get All Quiz Failure',
  props<{ errorMessage: string }>(),
);

export const getQuizById = createAction(
  '[Quiz] Get Quiz By Id',
  props<{ idToken: string; id: string }>(),
);

export const getQuizByIdSuccess = createAction(
  '[Quiz] Get Quiz By Id Success',
  props<{ quiz: Quiz }>(),
);

export const getQuizByIdFailure = createAction(
  '[Quiz] Get Quiz By Id Failure',
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

export const updateQuestionByIndex = createAction(
  '[Quiz] Update Question By Index',
  props<{ question: Question }>(),
);

export const storeCurrentQuestion = createAction(
  '[Question] Store Current Question',
  props<{ question: Question; index: number }>(),
);

export const clearQuizState = createAction('[Quiz] Clear Quiz State');
