import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import { ProfileState } from './profile.state';
import { Profile } from '../../models/profile.model';

export const initialState: ProfileState = {
  profile: <Profile>{},
  isLoading: false,
  isSuccessful: false,
  errorMessage: '',
};

export const profileReducer = createReducer(
  initialState,
  on(ProfileActions.createProfile, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: true,
      isSuccessful: false,
      errorMessage: '',
    };
  }),

  on(ProfileActions.createProfileSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: false,
      isSuccessful: true,
      errorMessage: '',
    };
  }),

  on(ProfileActions.createProfileFailure, (state, { errorMessage, type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isSuccessful: false,
      errorMessage,
    };
  }),

  on(ProfileActions.getProfile, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: true,
      isSuccessful: false,
      errorMessage: '',
    };
  }),

  on(ProfileActions.getProfileSuccess, (state, { profile, type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isSuccessful: true,
      profile,
      errorMessage: '',
    };
  }),

  on(ProfileActions.getProfileFailure, (state, { errorMessage, type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isSuccessful: false,
      errorMessage,
    };
  }),
);
