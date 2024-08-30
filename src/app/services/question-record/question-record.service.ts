import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  QuestionRecord,
  QuestionRecordDTO,
} from '../../models/questionRecord.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionRecordService {
  constructor(private http: HttpClient) {}

  getQuestionRecordsByGameId(idToken: string, gameId: string) {
    return this.http.get<QuestionRecord[]>(
      `${environment.apiUrl}/question-record/byGameId?id=${gameId}`,
      {
        headers: {
          Authorization: `${idToken}`,
        },
      },
    );
  }

  createQuestionRecord(idToken: string, questionRecord: QuestionRecordDTO) {
    return this.http.post(
      `${environment.apiUrl}/question-record`,
      { questionRecord: questionRecord },
      {
        headers: {
          Authorization: `${idToken}`,
        },
      },
    );
  }
}
