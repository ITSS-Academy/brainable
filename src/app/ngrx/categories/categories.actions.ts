import { createAction, props } from '@ngrx/store';
import { CategoriesByUid } from '../../models/categories.model';

export const getAllCategories = createAction('[Categories] Get All Categories');

export const getAllCategoriesSuccess = createAction(
  '[Categories] Get All Categories Success',
  props<{ categories: CategoriesByUid[] }>(),
);

export const getAllCategoriesFailure = createAction(
  '[Categories] Get All Categories Failure',
  props<{ errorMessage: string }>(),
);

export const getCategoryById = createAction(
  '[Categories] Get Category By Id',
  props<{ uid: string }>(),
);

export const getCategoryByIdSuccess = createAction(
  '[Categories] Get Category By Id Success',
  props<{ category: CategoriesByUid }>(),
);

export const getCategoryByIdFailure = createAction(
  '[Categories] Get Category By Id Failure',
  props<{ errorMessage: string }>(),
);
