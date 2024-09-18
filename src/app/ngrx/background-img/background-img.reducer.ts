import { BackgroundImgState } from './background-img.state';
import { createReducer, on } from '@ngrx/store';
import * as BackgroundImgActions from './background-img.actions';

const initialState: BackgroundImgState = {
  img: '',
};

export const backgroundImgReducer = createReducer(
  initialState,
  on(BackgroundImgActions.storeBackgroundImg, (state, { img }) => {
    return {
      ...state,
      img: img,
    };
  }),
  on(BackgroundImgActions.clearBackgroundImg, (state) => {
    return {
      ...state,
      img: '',
    };
  }),
);
