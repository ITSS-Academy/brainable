import { createReducer, on } from '@ngrx/store';
import * as QuestionReportActions from './questionReport.action';
import { QuetionReportState } from './questionReport.state';
const initialState: QuetionReportState = {
  questionRecords: [],
  questionRecord: null,
  isGetQuetionRecordsLoading: false,
  isGetQuetionRecordsSuccessful: false,
  getQuetionRecordsErrorMessage: '',
  isGetQuetionRecordLoading: false,
  isGetQuetionRecordSuccessful: false,
  getQuetionRecordErrorMessage: '',

  isCreateQuetionRecordLoading: false,
  isCreateQuetionRecordSuccessful: false,
  createQuetionRecordErrorMessage: '',
};

export const questionReportReducer = createReducer(
  initialState,
  on(QuestionReportActions.getQuestionReportsByGameId, (state) => {
    return {
      ...state,
      isGetQuestionReportsLoading: true,
    };
  }),
  on(
    QuestionReportActions.getQuestionReportsByGameIdSuccess,
    (state, { questionRecords }) => {
      console.log(questionRecords);
      return {
        ...state,
        questionRecords: questionRecords,
        isGetQuestionReportsLoading: false,
        isGetQuestionReportsSuccessful: true,
      };
    }
  ),
  on(
    QuestionReportActions.getQuestionReportsByGameIdFailure,
    (state, { errorMessage }) => {
      return {
        ...state,
        isGetQuestionReportsLoading: false,
        isGetQuestionReportsSuccessful: false,
        getQuestionReportsErrorMessage: errorMessage,
      };
    }
  )
);
