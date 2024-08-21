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

  isCreateQuizLoading: false,
  isCreateQuizSuccessful: false,
  createQuizErrorMessage: '',

  isUpdateQuestionLoading: false,
  isUpdateQuestionSuccessful: false,
  updateQuestionErrorMessage: '',

  currentQuestion: <Question>{},
  currentQuestionIndex: -1,
  previousQuestionIndex: -1,
  isStoreCurrentQuestionLoading: false,
  isStoreCurrentQuestionSuccessful: false,
  storeCurrentQuestionErrorMessage: '',

  isAddNewQuestionLoading: false,
  isAddNewQuestionSuccessful: false,
  addNewQuestionErrorMessage: '',

  isDeleteQuestionLoading: false,
  isDeleteQuestionSuccessful: false,
  deleteQuestionErrorMessage: '',
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

  on(QuizActions.updateQuestionByIndex, (state, { question, type }) => {
    console.log(type);

    if (!Array.isArray(state.quiz.questions)) {
      return state;
    }
    const updatedQuestions = [...state.quiz.questions];
    updatedQuestions[state.previousQuestionIndex] = question;

    return {
      ...state,
      quiz: {
        ...state.quiz,
        questions: updatedQuestions,
      },
      isUpdateQuestionLoading: true,
    };
  }),
  on(QuizActions.storeCurrentQuestion, (state, { type, question, index }) => {
    console.log(type);
    const updatedIndex = state.currentQuestionIndex;

    return {
      ...state,
      previousQuestionIndex: updatedIndex,
      currentQuestion: question,
      currentQuestionIndex: index,
      isStoreCurrentQuestionLoading: true,
    };
  }),
  on(QuizActions.storeCurrentQuiz, (state, { type, quiz }) => {
    console.log(type);
    return {
      ...state,
      quiz: quiz,
    };
  }),
  on(QuizActions.addNewQuestion, (state, { type, question }) => {
    console.log(type);
    console.log(state.quiz);
    return {
      ...state,
      isAddNewQuestionLoading: true,
      quiz: {
        ...state.quiz,
        questions: [...state.quiz.questions, { ...question }],
      },
    };
  }),
  on(QuizActions.deleteQuestion, (state, { type }) => {
    console.log(type);
    const updatedQuestions = state.quiz.questions.filter(
      (_, i) => i !== state.currentQuestionIndex,
    );
    return {
      ...state,
      isDeleteQuestionSuccessful: true,
      quiz: {
        ...state.quiz,
        questions: updatedQuestions,
      },
    };
  }),
);
