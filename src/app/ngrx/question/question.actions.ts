import { createAction, props } from '@ngrx/store';
import { QuestionDTO } from '../../models/question.model';

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
