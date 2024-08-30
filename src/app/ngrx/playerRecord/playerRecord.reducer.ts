import { createReducer, on } from '@ngrx/store';
import { PlayerRecordState } from './playerRecord.state';
import * as PlayerRecordActions from './playerRecord.action';

const initialState: PlayerRecordState = {
  playerRecords: [],
  playerRecord: null,
  isGetPlayerRecordsLoading: false,
  isGetPlayerRecordsSuccessful: false,
  getPlayerRecordsErrorMessage: '',
  isGetPlayerRecordLoading: false,
  isGetPlayerRecordSuccessful: false,
  getPlayerRecordErrorMessage: '',
  isCreatePlayerRecordLoading: false,
  isCreatePlayerRecordSuccessful: false,
  createPlayerRecordErrorMessage: '',
};

export const playerRecordReducer = createReducer(
  initialState,
  on(PlayerRecordActions.createPlayerRecord, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isGetPlayerRecordsLoading: true,
    };
  }),

  on(PlayerRecordActions.createPlayerRecordSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isGetPlayerRecordsLoading: false,
      isGetPlayerRecordsSuccessful: true,
    };
  }),

  on(
    PlayerRecordActions.createPlayerRecordFailure,
    (state, { errorMessage }) => {
      console.log(errorMessage);
      return {
        ...state,
        isGetPlayerRecordsLoading: false,
        isGetPlayerRecordsSuccessful: false,
        getPlayerRecordsErrorMessage: errorMessage,
      };
    },
  ),
);
