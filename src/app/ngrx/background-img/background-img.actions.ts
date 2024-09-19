import { createAction, props } from '@ngrx/store';

export const storeBackgroundImg = createAction(
  '[BackgroundImg] Store Background Image',
  props<{ img: string }>(),
);

export const clearBackgroundImg = createAction(
  '[BackgroundImg] Clear Background Image',
);
