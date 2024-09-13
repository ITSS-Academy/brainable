import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quiz, QuizDTO } from '../../models/quiz.model';
import { environment } from '../../../environments/environment';
import { MissingField, Question } from '../../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  createQuiz(idToken: string, quiz: any) {
    return this.http.post(`${environment.apiUrl}/quiz`, quiz, {
      headers: {
        Authorization: `${idToken}`,
      },
    });
  }

  updateQuiz(idToken: string, quiz: QuizDTO) {
    return this.http.put(`${environment.apiUrl}/quiz`, quiz, {
      headers: {
        Authorization: `${idToken}`,
      },
    });
  }

  deleteQuiz(idToken: string, id: string) {
    return this.http.delete(`${environment.apiUrl}/quiz/${id}`, {
      headers: {
        Authorization: `${idToken}`,
      },
    });
  }

  getQuiz(idToken: string) {
    return this.http.get(`${environment.apiUrl}/quiz`, {
      headers: {
        Authorization: `${idToken}`,
      },
    });
  }

  getQuizById(id: string) {
    return this.http.get(`${environment.apiUrl}/quiz/${id}`, {});
  }
}
