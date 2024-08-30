import { createReducer, on } from '@ngrx/store';
import * as QuestionRecordActions from './questionRecord.actions';
import { QuestionRecordState } from './questionRecord.state';
import { QuestionRecord } from '../../models/questionRecord.model';

const initialState: QuestionRecordState = {
  questionRecords: [],
  questionRecord: <QuestionRecord>{},

  isGetQuestionRecordsLoading: false,
  isGetQuestionRecordsSuccessful: false,
  getQuestionRecordsErrorMessage: '',

  isCreateQuestionRecordLoading: false,
  isCreateQuestionRecordSuccessful: false,
  createQuestionRecordErrorMessage: '',
};

export const questionRecordReducer = createReducer(
  initialState,
  on(QuestionRecordActions.getQuestionRecordByGameId, (state) => ({
    ...state,
    isGetQuestionRecordsLoading: true,
    isGetQuestionRecordsSuccessful: false,
    getQuestionRecordsErrorMessage: '',
  })),
  on(
    QuestionRecordActions.getQuestionRecordByGameIdSuccess,
    (state, { questionRecords }) => ({
      ...state,
      isGetQuestionRecordsLoading: false,
      isGetQuestionRecordsSuccessful: true,
      questionRecords,
    }),
  ),

  on(
    QuestionRecordActions.getQuestionRecordByGameIdFailure,
    (state, { errorMessage }) => ({
      ...state,
      isGetQuestionRecordsLoading: false,
      getQuestionRecordsErrorMessage: errorMessage,
    }),
  ),

  on(QuestionRecordActions.createQuestionRecord, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isCreateQuestionRecordLoading: true,
      isCreateQuestionRecordSuccessful: false,
      createQuestionRecordErrorMessage: '',
    };
  }),
  on(QuestionRecordActions.createQuestionRecordSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isCreateQuestionRecordLoading: false,
      isCreateQuestionRecordSuccessful: true,
    };
  }),
  on(
    QuestionRecordActions.createQuestionRecordFailure,
    (state, { errorMessage }) => {
      console.log(errorMessage);
      return {
        ...state,
        isCreateQuestionRecordLoading: false,
        createQuestionRecordErrorMessage: errorMessage,
      };
    },
  ),
);
