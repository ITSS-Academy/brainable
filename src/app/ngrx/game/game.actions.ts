import { createAction, props } from '@ngrx/store';

export const storePin = createAction(
  '[Game] Store Pin',
  props<{ pin: string | null }>(),
);

export const nextQuestion = createAction('[Game] Next Question');

export const storePlayerName = createAction(
  '[Game] Store Player Name',
  props<{ playerName: string }>(),
);

export const storePlayerAnswer = createAction(
  '[Game] Store Player Answer',
  props<{ answer: number }>(),
);

export const storeTotalPlayers = createAction(
  '[Game] Store Total Players',
  props<{ totalPlayers: number }>(),
);

export const storeTime = createAction(
  '[Game] Store Time',
  props<{ time: number }>(),
);

export const incrementScore = createAction('[Game] Increment Score');

export const resetGame = createAction('[Game] Reset Game');

export const storeTotalQuestions = createAction(
  '[Game] Total Questions',
  props<{ totalQuestions: number }>(),
);
