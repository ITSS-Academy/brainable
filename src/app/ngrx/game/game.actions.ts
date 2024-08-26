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
