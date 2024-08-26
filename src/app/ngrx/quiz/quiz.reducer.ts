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
};

export const quizReducer = createReducer(
  initialState,
  on(QuizActions.getAllQuiz, (state, action) => {
    console.log(action.type);
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
    console.log(errorMessage);
    return {
      ...state,
      isGetAllQuizLoading: false,
      isGetAllQuizSuccessful: false,
      getAllQuizErrorMessage: errorMessage,
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

  on(QuizActions.getQuizById, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetQuizByIdLoading: true,
    };
  }),
  on(QuizActions.getQuizByIdSuccess, (state, { quiz, type }) => {
    console.log(type);
    return {
      ...state,
      quiz: quiz,
      isGetQuizByIdLoading: false,
      isGetQuizByIdSuccessful: true,
    };
  }),
  on(QuizActions.getQuizByIdFailure, (state, { errorMessage }) => {
    console.log(errorMessage);
    return {
      ...state,
      isGetQuizByIdLoading: false,
      isGetQuizByIdSuccessful: false,
      getQuizByIdErrorMessage: errorMessage,
    };
  }),

  on(QuizActions.updateQuiz, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isUpdateQuizLoading: true,
    };
  }),

  on(QuizActions.updateQuizSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isUpdateQuizLoading: false,
      isUpdateQuizSuccessful: true,
    };
  }),

  on(QuizActions.updateQuizFailure, (state, { errorMessage }) => {
    console.log(errorMessage);
    return {
      ...state,
      isUpdateQuizLoading: false,
      isUpdateQuizSuccessful: false,
      updateQuizErrorMessage: errorMessage,
    };
  }),

  on(QuizActions.storeCurrentQuiz, (state, { type, quiz }) => {
    console.log(type);
    return {
      ...state,
      quiz: quiz,
    };
  }),
  on(QuizActions.addNewQuestion, (state, { type }) => {
    console.log(type);
    console.log(state.quiz);
    return {
      ...state,
      quiz: {
        ...state.quiz,
        questions: [...state.quiz.questions, {} as Question],
      },
    };
  }),
  on(QuizActions.updateQuestionByIndex, (state, { question, index, type }) => {
    console.log(type);

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
  on(QuizActions.updateSettingByIndex, (state, { setting, index, type }) => {
    console.log(type);

    if (!Array.isArray(state.quiz.questions)) {
      return state;
    }
    const updatedQuestions = [...state.quiz.questions];
    updatedQuestions[index] = setting.timeLimt;

    return {
      ...state,
      quiz: {
        ...state.quiz,
        isPublic: setting.isPublic,
        category: setting.category,
        questions: updatedQuestions,
      },
    };
  }),
  on(QuizActions.deleteQuestionByIndex, (state, { index, type }) => {
    console.log(type);

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

  on(QuizActions.storeDefaultQuiz, (state, { type, quiz }) => {
    console.log(type);
    return {
      ...state,
      quiz: quiz,
    };
  }),
);
