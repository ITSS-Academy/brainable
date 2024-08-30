import { QuestionRecord } from '../../models/questionRecord.model';

export interface QuestionRecordState {
  questionRecords: QuestionRecord[];
  questionRecord: QuestionRecord;

  isGetQuestionRecordsLoading: boolean;
  isGetQuestionRecordsSuccessful: boolean;
  getQuestionRecordsErrorMessage: string;

  isCreateQuestionRecordLoading: boolean;
  isCreateQuestionRecordSuccessful: boolean;
  createQuestionRecordErrorMessage: string;
}
