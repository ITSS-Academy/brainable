import { Quiz, QuizDTO } from '../../models/quiz.model';
import {Question, QuestionCheck} from '../../models/question.model';

export interface QuizState {
  // get all quiz
  quizzes: Quiz[];
  isGetAllQuizLoading: boolean;
  isGetAllQuizSuccessful: boolean;
  getAllQuizErrorMessage: string;

  // get quiz by id
  quiz: Quiz;
  quizCheck: QuestionCheck[];
  isGetQuizByIdLoading: boolean;
  isGetQuizByIdSuccessful: boolean;
  getQuizByIdErrorMessage: string;

  // update quiz
  isUpdateQuizLoading: boolean;
  isUpdateQuizSuccessful: boolean;
  updateQuizErrorMessage: string;

  // create quiz
  isCreateQuizLoading: boolean;
  isCreateQuizSuccessful: boolean;
  createQuizErrorMessage: string;

  // delete quiz
  isDeleteQuizLoading: boolean;
  isDeleteQuizSuccessful: boolean;
  deleteQuizErrorMessage: string;


}
