import { createAction, props } from '@ngrx/store';
import { Question, QuestionDTO } from '../../models/question.model';

export const createQuestion = createAction(
  '[Question] Create Question',
  props<{ idToken: string; question: QuestionDTO }>(),
);

export const createQuestionSuccess = createAction(
  '[Question] Create Question Success',
);

export const createQuestionFailure = createAction(
  '[Question] Create Question Failure',
  props<{ errorMessage: string }>(),
);

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
