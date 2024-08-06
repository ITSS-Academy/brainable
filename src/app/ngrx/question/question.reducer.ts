import { createReducer, on } from '@ngrx/store';
import * as QuestionActions from './question.actions';
import { QuestionState } from './question.state';
import { QuestionDTO } from '../../models/question.model';

export const initialState: QuestionState = {
  createQuestion: <QuestionDTO>{},
  isCreateQuestionLoading: false,
  isCreateQuestionSuccessful: false,
  createQuestionErrorMessage: '',
};

export const questionReducer = createReducer(
  initialState,
  on(QuestionActions.createQuestion, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isCreateQuestionLoading: true,
      isCreateQuestionSuccessful: false,
      createQuestionErrorMessage: '',
    };
  }),

  on(QuestionActions.createQuestionSuccess, (state) => {
    return {
      ...state,
      isCreateQuestionLoading: false,
      isCreateQuestionSuccessful: true,
    };
  }),

  on(QuestionActions.createQuestionFailure, (state, { errorMessage }) => {
    return {
      ...state,
      isCreateQuestionLoading: false,
      isCreateQuestionSuccessful: false,
      createQuestionErrorMessage: errorMessage,
    };
  }),
);
