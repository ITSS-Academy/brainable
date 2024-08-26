import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap, of } from 'rxjs';
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

  getCategoriesById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.getCategoryById),
      switchMap((action) => {
        return this.categoriesService.getCategoriesById(action.uid);
      }),
      map((category: any) => {
        return CategoriesActions.getCategoryByIdSuccess({ category });
      }),
      catchError((error) => {
        return of(
          CategoriesActions.getCategoryByIdFailure({ errorMessage: error }),
        );
      }),
    );
  });
}
