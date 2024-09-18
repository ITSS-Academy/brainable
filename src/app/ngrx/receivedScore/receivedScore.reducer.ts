import { ReceivedScoreState } from './receivedScore.state';
import { createReducer, on } from '@ngrx/store';
import * as ReceivedScoreActions from './receivedScore.actions';

export const initialState: ReceivedScoreState = {
  receivedScore: 0,
};

export const receivedScoreReducer = createReducer(
  initialState,
  on(ReceivedScoreActions.storeReceivedScore, (state, { receivedScore }) => {
    return {
      receivedScore,
    };
  }),
);
