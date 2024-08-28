import { createAction, props } from '@ngrx/store';

export const createPlayerRecord = createAction(
  '[PlayerRecord] Create Player Record',
  props<{ idToken: string; playerRecord: any }>()
);

export const createPlayerRecordSuccess = createAction(
  '[PlayerRecord] Create Player Record Success'
);

export const createPlayerRecordFailure = createAction(
  '[PlayerRecord] Create Player Record Failure',
  props<{ errorMessage: string }>()
);
