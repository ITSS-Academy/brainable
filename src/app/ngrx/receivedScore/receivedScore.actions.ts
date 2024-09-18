import { createAction, props } from '@ngrx/store';

export const storeReceivedScore = createAction(
  'storeReceivedScore',
  props<{ receivedScore: number }>(),
);
