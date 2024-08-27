import { createReducer, on } from '@ngrx/store';
import * as QuizActions from './quiz.actions';
import { QuizState } from './quiz.state';
import { Quiz, QuizDTO } from '../../models/quiz.model';
import { questionReducer } from '../question/question.reducer';
import { Question } from '../../models/question.model';
import * as QuestionActions from '../question/question.actions';
import { Q } from '@angular/cdk/keycodes';

export const initialState: QuizState = {
  quizzes: [],
  isGetAllQuizLoading: false,
  isGetAllQuizSuccessful: false,
  getAllQuizErrorMessage: '',

  quiz: <Quiz>{},
  isGetQuizByIdLoading: false,
  isGetQuizByIdSuccessful: false,
  getQuizByIdErrorMessage: '',

  isUpdateQuizLoading: false,
  isUpdateQuizSuccessful: false,
  updateQuizErrorMessage: '',

  isCreateQuizLoading: false,
  isCreateQuizSuccessful: false,
  createQuizErrorMessage: '',

  isDeleteQuizLoading: false,
  isDeleteQuizSuccessful: false,
  deleteQuizErrorMessage: '',
};

export const quizReducer = createReducer(
  initialState,
  on(QuizActions.getAllQuiz, (state, action) => {
    return {
      ...state,
      isGetAllQuizLoading: true,
    };
  }),
  on(QuizActions.getAllQuizSuccess, (state, { quiz }) => {
    return {
      ...state,
      quizzes: quiz,
      isGetAllQuizLoading: false,
      isGetAllQuizSuccessful: true,
    };
  }),
  on(QuizActions.getAllQuizFailure, (state, { errorMessage }) => {
    return {
      ...state,
      isGetAllQuizLoading: false,
      isGetAllQuizSuccessful: false,
      getAllQuizErrorMessage: errorMessage,
    };
  }),

  on(QuizActions.createQuiz, (state, action) => {
    return {
      ...state,
      isCreateQuizLoading: true,
      isCreateQuizSuccessful: false,
      createQuizErrorMessage: '',
    };
  }),
  on(QuizActions.createQuizSuccess, (state) => {
    return {
      ...state,
      isCreateQuizLoading: false,
      isCreateQuizSuccessful: true,
    };
  }),
  on(QuizActions.createQuizFailure, (state, { errorMessage }) => {
    return {
      ...state,
      isCreateQuizLoading: false,
      isCreateQuizSuccessful: false,
      createQuizErrorMessage: errorMessage,
    };
  }),

  on(QuizActions.getQuizById, (state, action) => {
    return {
      ...state,
      isGetQuizByIdLoading: true,
    };
  }),
  on(QuizActions.getQuizByIdSuccess, (state, { quiz, type }) => {
    return {
      ...state,
      quiz: quiz,
      isGetQuizByIdLoading: false,
      isGetQuizByIdSuccessful: true,
    };
  }),
  on(QuizActions.getQuizByIdFailure, (state, { errorMessage }) => {
    return {
      ...state,
      isGetQuizByIdLoading: false,
      isGetQuizByIdSuccessful: false,
      getQuizByIdErrorMessage: errorMessage,
    };
  }),

  on(QuizActions.updateQuiz, (state, action) => {
    return {
      ...state,
      isUpdateQuizLoading: true,
    };
  }),

  on(QuizActions.updateQuizSuccess, (state, { type }) => {
    return {
      ...state,
      isUpdateQuizLoading: false,
      isUpdateQuizSuccessful: true,
    };
  }),

  on(QuizActions.updateQuizFailure, (state, { errorMessage }) => {
    return {
      ...state,
      isUpdateQuizLoading: false,
      isUpdateQuizSuccessful: false,
      updateQuizErrorMessage: errorMessage,
    };
  }),

  on(QuizActions.storeCurrentQuiz, (state, { type, quiz }) => {
    return {
      ...state,
      quiz: quiz,
    };
  }),
  on(QuizActions.addNewQuestion, (state, { type }) => {
    return {
      ...state,
      quiz: {
        ...state.quiz,
        questions: [...state.quiz.questions, {} as Question],
      },
    };
  }),
  on(QuizActions.updateQuestionByIndex, (state, { question, index, type }) => {
    if (!Array.isArray(state.quiz.questions)) {
      return state;
    }
    const updatedQuestions = [...state.quiz.questions];
    updatedQuestions[index] = question;

    return {
      ...state,
      quiz: {
        ...state.quiz,
        questions: updatedQuestions,
      },
    };
  }),
  on(QuizActions.updateSettingByIndex, (state, { setting, type }) => {
    if (!Array.isArray(state.quiz.questions)) {
      return state;
    }
    const updatedQuestions = [...state.quiz.questions];

    return {
      ...state,
      quiz: {
        ...state.quiz,
        title: setting.title,
        description: setting.description,
        isPublic: setting.isPublic,
        category: setting.category,
        questions: updatedQuestions,
      },
    };
  }),
  on(QuizActions.deleteQuestionByIndex, (state, { index, type }) => {
    if (!Array.isArray(state.quiz.questions)) {
      return state;
    }
    const updatedQuestions = state.quiz.questions.filter(
      (question, questionIndex) => questionIndex !== index,
    );

    return {
      ...state,
      quiz: {
        ...state.quiz,
        questions: updatedQuestions,
      },
    };
  }),
  on(QuizActions.deleteQuiz, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isDeleteQuizLoading: true,
    };
  }),
  on(QuizActions.deleteQuizSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isDeleteQuizLoading: false,
      isDeleteQuizSuccessful: true,
    };
  }),
  on(QuizActions.deleteQuizFailure, (state, { errorMessage }) => {
    console.log(errorMessage);
    return {
      ...state,
      isDeleteQuizLoading: false,
      isDeleteQuizSuccessful: false,
      deleteQuizErrorMessage: errorMessage,
    };
  }),

  on(QuizActions.storeDefaultQuiz, (state, { type, quiz }) => {
    return {
      ...state,
      quiz: quiz,
    };
  }),
  on(QuizActions.clearQuizState, (state, { type }) => {
    return {
      ...state,
      quizzes: [],
      isGetAllQuizLoading: false,
      isGetAllQuizSuccessful: false,
      getAllQuizErrorMessage: '',

      quiz: <Quiz>{},
      isGetQuizByIdLoading: false,
      isGetQuizByIdSuccessful: false,
      getQuizByIdErrorMessage: '',

      isUpdateQuizLoading: false,
      isUpdateQuizSuccessful: false,
      updateQuizErrorMessage: '',

      isCreateQuizLoading: false,
      isCreateQuizSuccessful: false,
      createQuizErrorMessage: '',

      isDeleteQuizLoading: false,
      isDeleteQuizSuccessful: false,
      deleteQuizErrorMessage: '',
    };
  }),
);
