import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionDTO } from '../../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  createQuestion(idToken: string, question: QuestionDTO) {
    return this.http.post(`http://localhost:3000/question`, question, {
      headers: {
        Authorization: `${idToken}`,
      },
    });
  }
}
