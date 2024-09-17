import { createAction, props } from '@ngrx/store';
import {
  QuestionRecord,
  QuestionRecordDTO,
} from '../../models/questionRecord.model';

export const getQuestionRecordByGameId = createAction(
  '[QuestionRecord] Get Question Records',
  props<{ idToken: string; gameId: string }>(),
);

export const getQuestionRecordByGameIdSuccess = createAction(
  '[QuestionRecord] Get Question Records Success',
  props<{ questionRecords: QuestionRecord[] }>(),
);

export const getQuestionRecordByGameIdFailure = createAction(
  '[QuestionRecord] Get Question Records Failure',
  props<{ errorMessage: string }>(),
);

export const createQuestionRecord = createAction(
  '[QuestionReport] Create Question Record',
  props<{ idToken: string; questionRecord: QuestionRecordDTO }>(),
);

export const createQuestionRecordSuccess = createAction(
  '[QuestionReport] Create Question Record Success',
);

export const createQuestionRecordFailure = createAction(
  '[QuestionReport] Create Question Record Failure',
  props<{ errorMessage: string }>(),
);

export const clearStateQuestionRecord = createAction(
  '[QuestionRecord] Clear State',
);
