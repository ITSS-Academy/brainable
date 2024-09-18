import { GetQuizByIdPipe } from './get-quiz-by-id.pipe';
import { QuizService } from '../services/quiz/quiz.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('GetQuizByIdPipe', () => {
  let quizService: QuizService;
  it('create an instance', () => {
    const pipe = new GetQuizByIdPipe(quizService);
    expect(pipe).toBeTruthy();
  });
});
