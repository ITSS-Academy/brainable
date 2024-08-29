import { GameReportState } from './gameReport.state';
import * as GameReportActions from './gameReport.action';
import { createReducer, on } from '@ngrx/store';
import { GameReport } from '../../models/gameReport.model';

const initialState: GameReportState = {
  gameReports: [],
  gameReport: null,
  gameId: '',

  isGetGameReportsLoading: false,
  isGetGameReportsSuccessful: false,
  getGameReportsErrorMessage: '',

  isGetGameReportLoading: false,
  isGetGameReportSuccessful: false,
  getGameReportErrorMessage: '',

  isCreateGameReportLoading: false,
  isCreateGameReportSuccessful: false,
  createGameReportErrorMessage: '',
};

export const gameReportReducer = createReducer(
  initialState,
  on(GameReportActions.getAllGameReports, (state, action) => {
    return {
      ...state,
      isGetGameReportsLoading: true,
    };
  }),
  on(GameReportActions.getAllGameReportsSuccess, (state, { gameReports }) => {
    return {
      ...state,
      gameReports: gameReports,
      isGetGameReportsLoading: false,
      isGetGameReportsSuccessful: true,
    };
  }),
  on(GameReportActions.getAllGameReportsFailure, (state, { errorMessage }) => {
    return {
      ...state,
      isGetGameReportsLoading: false,
      isGetGameReportsSuccessful: false,
      getGameReportsErrorMessage: errorMessage,
    };
  }),

  on(GameReportActions.getGameReport, (state) => {
    return {
      ...state,
      isGetGameReportLoading: true,
    };
  }),
  on(GameReportActions.getGameReportSuccess, (state, { gameReport }) => {
    return {
      ...state,
      gameReport: gameReport,
      isGetGameReportLoading: false,
      isGetGameReportSuccessful: true,
    };
  }),
  on(GameReportActions.getGameReportFailure, (state, { errorMessage }) => {
    return {
      ...state,
      isGetGameReportLoading: false,
      isGetGameReportSuccessful: false,
      getGameReportErrorMessage: errorMessage,
    };
  }),

  on(GameReportActions.createGameReport, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isCreateGameReportLoading: true,
    };
  }),
  on(GameReportActions.createGameReportSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isCreateGameReportLoading: false,
      isCreateGameReportSuccessful: true,
    };
  }),
  on(GameReportActions.createGameReportFailure, (state, { errorMessage }) => {
    console.log(errorMessage);
    return {
      ...state,
      isCreateGameReportLoading: false,
      isCreateGameReportSuccessful: false,
      createGameReportErrorMessage: errorMessage,
    };
  }),
);
