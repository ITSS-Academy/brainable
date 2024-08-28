import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import * as PlayerRecordActions from './playerRecord.action';
import { PlayerRecordService } from '../../services/player/player-record.service';
@Injectable()
export class PlayerRecordEffect {
  constructor(
    private actions$: Actions,
    private playerRecordService: PlayerRecordService
  ) {}


  createPlayerRecord$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlayerRecordActions.createPlayerRecord),
      switchMap((action) => {
        return this.playerRecordService.createPlayerRecord(
          action.idToken,
          action.playerRecord
        );
      }),
      map(() => {
        return PlayerRecordActions.createPlayerRecordSuccess();
      }),
      catchError((error) => {
        return of(
          PlayerRecordActions.createPlayerRecordFailure({ errorMessage: error })
        );
      })
    );
  });
}
