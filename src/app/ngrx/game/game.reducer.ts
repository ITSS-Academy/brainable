import { createReducer, on } from '@ngrx/store';
import * as GameActions from './game.actions';
import { GameState } from './game.state';

export const initialState: GameState = {
  pin: '',
  currentQuestion: 0,
  playerName: '',
  playerAnswer: 0,
};

export const gameReducer = createReducer(
  initialState,
  on(GameActions.storePin, (state, { pin, type }) => {
    return {
      ...state,
      pin: pin,
    };
  }),
  on(GameActions.nextQuestion, (state) => {
    return {
      ...state,
      currentQuestion: state.currentQuestion + 1,
    };
  }),
  on(GameActions.storePlayerName, (state, { playerName }) => {
    return {
      ...state,
      playerName: playerName,
    };
  }),
  on(GameActions.storePlayerAnswer, (state, { answer }) => {
    return {
      ...state,
      playerAnswer: answer,
    };
  }),
);
