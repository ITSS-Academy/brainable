import { Quiz, QuizDTO } from '../../models/quiz.model';

export interface QuizState {
  // get quiz
  getQuiz: Quiz[];
  isGetQuizLoading: boolean;
  isGetQuizSuccessful: boolean;
  getQuizErrorMessage: string;

  // create quiz
  createQuiz: QuizDTO;
  isCreateQuizLoading: boolean;
  isCreateQuizSuccessful: boolean;
  createQuizErrorMessage: string;
}
