import { createAction, props } from '@ngrx/store';
import { Categories } from '../../models/categories.model';

export const getAllCategories = createAction('[Categories] Get All Categories');

export const getAllCategoriesSuccess = createAction(
  '[Categories] Get All Categories Success',
  props<{ categories: Categories[] }>(),
);

export const getAllCategoriesFailure = createAction(
  '[Categories] Get All Categories Failure',
  props<{ errorMessage: string }>(),
);
