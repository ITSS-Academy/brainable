import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, of, map, switchMap } from 'rxjs';

import * as SearchActions from './search.actions';
import { SearchService } from '../../services/search/search.service';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService,
  ) {}

  search$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchActions.search),
      switchMap((action) => {
        return this.searchService.searchByQuery(action.query);
      }),
      map((results: any) => {
        return SearchActions.searchSuccess({ results });
      }),
      catchError((error) => {
        return of(SearchActions.searchFailure({ errorMessage: error }));
      }),
    );
  });
}
