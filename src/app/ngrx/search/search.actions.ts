import { createAction, props } from '@ngrx/store';
import { SearchModel } from '../../models/search.model';

export const search = createAction(
  '[Search] Search',
  props<{ query: string }>(),
);

export const searchSuccess = createAction(
  '[Search] Search Success',
  props<{ results: SearchModel[] }>(),
);

export const searchFailure = createAction(
  '[Search] Search Failure',
  props<{ errorMessage: string }>(),
);
