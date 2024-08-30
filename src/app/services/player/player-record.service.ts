import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PlayerRecord } from '../../models/playerRecord.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlayerRecordService {
  constructor(private http: HttpClient) {}

  createPlayerRecord(idToken: string, playerRecord: PlayerRecord[]) {
    return this.http.post(
      `${environment.apiUrl}/game-record`,
      { gameRecord: playerRecord },
      {
        headers: {
          Authorization: `${idToken}`,
        },
      },
    );
  }
}
