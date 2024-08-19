import { createReducer, on } from '@ngrx/store';
import * as GameActions from './game.actions';
import { GameState } from './game.state';

export const initialState: GameState = {
  pin: '',
};

export const gameReducer = createReducer(
  initialState,
  on(GameActions.storePin, (state, { pin, type }) => {
    console.log(type);
    return {
      ...state,
      pin: pin,
    };
  }),
);
