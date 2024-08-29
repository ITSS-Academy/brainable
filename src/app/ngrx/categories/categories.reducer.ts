import { createReducer, on } from '@ngrx/store';
import * as CategoriesActions from './categories.actions';
import { Categories, CategoriesByUid } from '../../models/categories.model';
import { CategoriesState } from './categories.state';

export const initialState: CategoriesState = {
  categories: [],
  isGetAllCategoriesLoading: false,
  isGetAllCategoriesSuccessful: false,
  getAllCategoriesErrorMessage: '',

  category: <CategoriesByUid>{},
  isGetCategoryLoading: false,
  isGetCategorySuccessful: false,
  getCategoryErrorMessage: '',
};

export const categoriesReducer = createReducer(
  initialState,
  on(CategoriesActions.getAllCategories, (state) => {
    return {
      ...state,
      isGetAllCategoriesLoading: true,
      isGetAllCategoriesSuccessful: false,
      getAllCategoriesErrorMessage: '',
    };
  }),
  on(CategoriesActions.getAllCategoriesSuccess, (state, { categories }) => {
    return {
      ...state,
      categories: categories,
      isGetAllCategoriesLoading: false,
      isGetAllCategoriesSuccessful: true,
    };
  }),
  on(CategoriesActions.getAllCategoriesFailure, (state, { errorMessage }) => {
    return {
      ...state,
      isGetAllCategoriesLoading: false,
      getAllCategoriesErrorMessage: errorMessage,
    };
  }),
  on(CategoriesActions.getCategoryById, (state) => {
    return {
      ...state,
      isGetCategoryLoading: true,
      isGetCategorySuccessful: false,
      getCategoryErrorMessage: '',
    };
  }),
  on(CategoriesActions.getCategoryByIdSuccess, (state, { category }) => {
    return {
      ...state,
      category: category,
      isGetCategoryLoading: false,
      isGetCategorySuccessful: true,
    };
  }),
  on(CategoriesActions.getCategoryByIdFailure, (state, { errorMessage }) => {
    return {
      ...state,
      isGetCategoryLoading: false,
      getCategoryErrorMessage: errorMessage,
    };
  }),
);
