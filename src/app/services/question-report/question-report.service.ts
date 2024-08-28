import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionRecord } from '../../models/questionRecord.model';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class QuestionReportService {
  constructor(private http: HttpClient) {}

  getQuestionReportsByGameId(idToken: string, gameId: string) {
    return this.http.get<QuestionRecord[]>(
      `${environment.apiUrl}/question-record/byGameId?id=${gameId}`,
      {
        headers: {
          Authorization: `${idToken}`,
        },
      }
    );
  }

  createQuestionRecord(idToken: string, questionRecord: QuestionRecord) {
    return this.http.post(
      `${environment.apiUrl}/question-record`,
      {questionRecord: questionRecord},
      {
        headers: {
          Authorization: `${idToken}`,
        },
      }
    );
  }
}
