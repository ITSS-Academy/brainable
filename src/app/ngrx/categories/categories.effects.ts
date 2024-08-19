import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, of, map, switchMap } from 'rxjs';

import * as CategoriesActions from './categories.actions';
import { CategoriesService } from '../../services/categories/categories.service';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService,
  ) {}

  getCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.getAllCategories),
      switchMap(() => {
        return this.categoriesService.getAllCategories();
      }),
      map((categories: any) => {
        return CategoriesActions.getAllCategoriesSuccess({ categories });
      }),
      catchError((error) => {
        return of(
          CategoriesActions.getAllCategoriesFailure({ errorMessage: error }),
        );
      }),
    );
  });
}
