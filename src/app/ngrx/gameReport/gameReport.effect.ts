import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { GameService } from '../../services/game/game.service';
import * as GameReportActions from './gameReport.action';

@Injectable()
export class GameReportEffects {
  constructor(
    private actions$: Actions,
    private gameService: GameService,
  ) {}

  getGameReports$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameReportActions.getAllGameReports),
      switchMap((action) => {
        return this.gameService.getGamesByUser(action.idToken);
      }),
      map((gameReports: any) => {
        return GameReportActions.getAllGameReportsSuccess({ gameReports });
      }),
      catchError((error) => {
        return of(
          GameReportActions.getAllGameReportsFailure({ errorMessage: error }),
        );
      }),
    );
  });

  getGameReport$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameReportActions.getGameReport),
      switchMap((action) => {
        return this.gameService.getGameById(action.idToken, action.gameId);
      }),
      map((gameReport: any) => {
        return GameReportActions.getGameReportSuccess({ gameReport });
      }),
      catchError((error) => {
        return of(
          GameReportActions.getGameReportFailure({ errorMessage: error }),
        );
      }),
    );
  });

  createGameReport$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameReportActions.createGameReport),
      switchMap((action) => {
        return this.gameService.createGame(action.idToken, action.gameReport);
      }),
      map((data: any) => {
        return GameReportActions.createGameReportSuccess({
          gameId: data.gameId,
        });
      }),
      catchError((error) => {
        return of(
          GameReportActions.createGameReportFailure({ errorMessage: error }),
        );
      }),
    );
  });
}
