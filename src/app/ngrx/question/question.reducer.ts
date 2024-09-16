import { createReducer, on } from '@ngrx/store';
import { QuestionState } from './question.state';
import * as QuestionActions from './question.actions';

export const initialState: QuestionState = {
  questions: [],
  isGetQuestionsByQuizIdLoading: false,
  isGetQuestionsByQuizIdSuccessful: false,
  getQuestionsByQuizIdErrorMessage: '',

  isDeleteQuestionLoading: false,
  isDeleteQuestionSuccessful: false,
  deleteQuestionErrorMessage: '',
};

export const questionReducer = createReducer(
  initialState,
  on(QuestionActions.deleteQuestion, (state, {type}) => {
    return {
      ...state,
      isDeleteQuestionLoading: true,
      isDeleteQuestionSuccessful: false,
      deleteQuestionErrorMessage: '',
    };
    }
  ),
  on(QuestionActions.deleteQuestionSuccess, (state, {type}) => {
    return {
      ...state,
      isDeleteQuestionLoading: false,
      isDeleteQuestionSuccessful: true,
      deleteQuestionErrorMessage: '',
    };
  }),
  on(QuestionActions.deleteQuestionFailure, (state, {errorMessage}) => {
    return {
      ...state,
      isDeleteQuestionLoading: false,
      isDeleteQuestionSuccessful: false,
      deleteQuestionErrorMessage: errorMessage,
    };
  }),
)
