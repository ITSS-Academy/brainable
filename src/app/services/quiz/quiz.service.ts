import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuizDTO } from '../../models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  createQuiz(idToken: string, quiz: QuizDTO) {
    return this.http.post(`http://localhost:3000/quiz`, quiz, {
      headers: {
        Authorization: `${idToken}`,
      },
    });
  }

  getQuiz(idToken: string) {
    return this.http.get(`http://localhost:3000/quiz`, {
      headers: {
        Authorization: `${idToken}`,
      },
    });
  }

  getQuizById(idToken: string, id: string) {
    return this.http.get(`http://localhost:3000/quiz/${id}`, {
      headers: {
        Authorization: `${idToken}`,
      },
    });
  }
}
