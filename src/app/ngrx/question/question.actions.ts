import { createAction, props } from '@ngrx/store';
import { Question } from '../../models/question.model';

export const getQuestionsByQuizId = createAction(
  '[Question] Get Questions By Quiz Id',
  props<{ idToken: string; quizId: string }>(),
);

export const getQuestionsByQuizIdSuccess = createAction(
  '[Question] Get Questions By Quiz Id Success',
  props<{ questions: Question[] }>(),
);

export const getQuestionsByQuizIdFailure = createAction(
  '[Question] Get Questions By Quiz Id Failure',
  props<{ errorMessage: string }>(),
);

export const deleteQuestion = createAction(
  '[Question] Delete Question',
  props<{ idToken: string; questionId: string }>(),
);

export const deleteQuestionSuccess = createAction(
  '[Question] Delete Question Success',
);

export const deleteQuestionFailure = createAction(
  '[Question] Delete Question Failure',
  props<{ errorMessage: string }>(),
);
