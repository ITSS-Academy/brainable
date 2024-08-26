import { CategoriesState } from './categories.state';
import { createReducer, on } from '@ngrx/store';
import * as CategoriesActions from './categories.actions';

export const initialState: CategoriesState = {
  getAllCategories: [],
  isGetAllCategoriesLoading: false,
  isGetAllCategoriesSuccessful: false,
  getAllCategoriesErrorMessage: '',
};

export const categoriesReducer = createReducer(
  initialState,
  on(CategoriesActions.getAllCategories, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetAllCategoriesLoading: true,
    };
  }),
  on(CategoriesActions.getAllCategoriesSuccess, (state, { categories }) => {
    return {
      ...state,
      getAllCategories: categories,
      isGetAllCategoriesLoading: false,
      isGetAllCategoriesSuccessful: true,
    };
  }),
  on(CategoriesActions.getAllCategoriesFailure, (state, { errorMessage }) => {
    console.log(errorMessage);
    return {
      ...state,
      isGetAllCategoriesLoading: false,
      getAllCategoriesErrorMessage: errorMessage,
    };
  }),
);
