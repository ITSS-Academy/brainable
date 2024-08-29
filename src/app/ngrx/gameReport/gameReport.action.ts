import { createAction, props } from '@ngrx/store';
import { GameReport } from '../../models/gameReport.model';

export const getAllGameReports = createAction(
  '[GameReport] Get All Game Reports',
  props<{ idToken: string }>(),
);

export const getAllGameReportsSuccess = createAction(
  '[GameReport] Get All Game Reports Success',
  props<{ gameReports: GameReport[] }>(),
);
export const getAllGameReportsFailure = createAction(
  '[GameReport] Get All Game Reports Failure',
  props<{ errorMessage: string }>(),
);

export const getGameReport = createAction(
  '[GameReport] Get Game Report',
  props<{ idToken: string; gameId: string }>(),
);
export const getGameReportSuccess = createAction(
  '[GameReport] Get Game Report Success',
  props<{ gameReport: GameReport }>(),
);
export const getGameReportFailure = createAction(
  '[GameReport] Get Game Report Failure',
  props<{ errorMessage: string }>(),
);

export const createGameReport = createAction(
  '[GameReport] Create Game Report',
  props<{ idToken: string; gameReport: GameReport }>(),
);
export const createGameReportSuccess = createAction(
  '[GameReport] Create Game Report Success',
  props<{ gameId: string }>(),
);
export const createGameReportFailure = createAction(
  '[GameReport] Create Game Report Failure',
  props<{ errorMessage: string }>(),
);
