import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {

  }

  deleteQuestion(idToken: string, id: string) {
    return this.http.delete(`${environment.apiUrl}/question/${id}`, {
      headers: {
        Authorization: `${idToken}`,
      },
    });
  }
}
