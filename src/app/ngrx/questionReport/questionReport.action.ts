import { createAction, props } from '@ngrx/store';
import { QuestionRecord } from '../../models/questionRecord.model';

export const getQuestionReportsByGameId = createAction(
  '[QuestionReport] Get Question Reports By Game Id',
  props<{ idToken: string; gameId: string }>()
);

export const getQuestionReportsByGameIdSuccess = createAction(
  '[QuestionReport] Get Question Reports By Game Id Success',
  props<{ questionRecords: QuestionRecord[] }>()
);

export const getQuestionReportsByGameIdFailure = createAction(
  '[QuestionReport] Get Question Reports By Game Id Failure',
  props<{ errorMessage: string }>()
);

export const createQuestionRecord = createAction(
  '[QuestionReport] Create Question Record',
  props<{ idToken: string; questionRecord: QuestionRecord }>()
);

export const createQuestionRecordSuccess = createAction(
  '[QuestionReport] Create Question Record Success'
);

export const createQuestionRecordFailure = createAction(
  '[QuestionReport] Create Question Record Failure',
  props<{ errorMessage: string }>()
);
