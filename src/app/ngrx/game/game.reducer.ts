import { createReducer, on } from '@ngrx/store';
import * as GameActions from './game.actions';
import { GameState } from './game.state';

export const initialState: GameState = {
  pin: '',
  currentQuestion: 0,
  playerName: '',
  playerAnswer: 0,
  totalPlayers: 0,
  totalQuestions: 0,
  clientId: '',

  previousResult: [],
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
  on(GameActions.storeTotalPlayers, (state, { totalPlayers }) => {
    return {
      ...state,
      totalPlayers: totalPlayers,
    };
  }),
  on(GameActions.storeTotalQuestions, (state, { totalQuestions }) => {
    return {
      ...state,
      totalQuestions: totalQuestions,
    };
  }),
  on(GameActions.storePreviousResult, (state, { previousResult }) => {
    return {
      ...state,
      previousResult: previousResult,
    };
  }),
  on(GameActions.clearState, (state) => {
    return initialState;
  }),
  on(GameActions.storeClientId, (state, { clientId }) => {
    return {
      ...state,
      clientId: clientId,
    };
  }),
);
