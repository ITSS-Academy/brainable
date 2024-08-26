import { createReducer, on } from '@ngrx/store';
import { QuestionState } from './question.state';

export const initialState: QuestionState = {
  questions: [],
  isGetQuestionsByQuizIdLoading: false,
  isGetQuestionsByQuizIdSuccessful: false,
  getQuestionsByQuizIdErrorMessage: '',
};

export const questionReducer = createReducer(initialState);
