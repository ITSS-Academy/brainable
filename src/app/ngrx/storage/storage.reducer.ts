import { StorageState } from './storage.state';
import { createReducer, on } from '@ngrx/store';
import * as StorageActions from './storage.action';

export const initialState: StorageState = {
  isPostSuccess: false,
  isLoading: false,

  isSettingUpload: false,
  isSettingUploadSuccess: false,
};

export const storageReducer = createReducer(
  initialState,
  on(StorageActions.storeImageUpload, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(StorageActions.storeImageUploadSuccess, (state, { type }) => {
    return {
      ...state,
      isPostSuccess: true,
      isLoading: false,
    };
  }),

  on(StorageActions.storeSettingUpload, (state) => {
    return {
      ...state,
      isSettingUpload: true,
    };
  }),
  on(StorageActions.storeSettingUploadSuccess, (state) => {
    return {
      ...state,
      isSettingUploadSuccess: true,
      isSettingUpload: false,
    };
  }),
  on(StorageActions.clearStorageState, (state) => {
    return initialState;
  }),
);
