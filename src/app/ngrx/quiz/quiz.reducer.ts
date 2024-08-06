import { createReducer, on } from '@ngrx/store';
import * as QuizActions from './quiz.actions';
import { QuizState } from './quiz.state';
import { QuizDTO } from '../../models/quiz.model';

export const initialState: QuizState = {
  getQuiz: [],
  isGetQuizLoading: false,
  isGetQuizSuccessful: false,
  getQuizErrorMessage: '',

  createQuiz: <QuizDTO>{},
  isCreateQuizLoading: false,
  isCreateQuizSuccessful: false,
  createQuizErrorMessage: '',
};

export const quizReducer = createReducer(
  initialState,
  on(QuizActions.getQuiz, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetQuizLoading: true,
      isGetQuizSuccessful: false,
      getQuizErrorMessage: '',
    };
  }),

  on(QuizActions.getQuizSuccess, (state, { quiz }) => {
    console.log(quiz);
    return {
      ...state,
      getQuiz: quiz,
      isGetQuizLoading: false,
      isGetQuizSuccessful: true,
    };
  }),

  on(QuizActions.getQuizFailure, (state, { errorMessage }) => {
    console.log(errorMessage);
    return {
      ...state,
      isGetQuizLoading: false,
      isGetQuizSuccessful: false,
      getQuizErrorMessage: errorMessage,
    };
  }),

  on(QuizActions.createQuiz, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isCreateQuizLoading: true,
      isCreateQuizSuccessful: false,
      createQuizErrorMessage: '',
    };
  }),

  on(QuizActions.createQuizSuccess, (state) => {
    console.log(QuizActions.createQuizSuccess.type);
    return {
      ...state,
      isCreateQuizLoading: false,
      isCreateQuizSuccessful: true,
    };
  }),

  on(QuizActions.createQuizFailure, (state, { errorMessage }) => {
    console.log(errorMessage);
    return {
      ...state,
      isCreateQuizLoading: false,
      isCreateQuizSuccessful: false,
      createQuizErrorMessage: errorMessage,
    };
  }),
  on(QuizActions.clearCreateState, (state) => {
    return {
      ...state,
      isCreateQuizLoading: false,
      isCreateQuizSuccessful: false,
      createQuizErrorMessage: '',
    };
  }),
);
