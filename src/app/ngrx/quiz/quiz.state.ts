import { Quiz, QuizDTO } from '../../models/quiz.model';
import { Question } from '../../models/question.model';

export interface QuizState {
  // get all quiz
  quizzes: Quiz[];
  isGetAllQuizLoading: boolean;
  isGetAllQuizSuccessful: boolean;
  getAllQuizErrorMessage: string;

  // get quiz by id
  quiz: Quiz;
  isGetQuizByIdLoading: boolean;
  isGetQuizByIdSuccessful: boolean;
  getQuizByIdErrorMessage: string;

  // create quiz
  createQuiz: QuizDTO;
  isCreateQuizLoading: boolean;
  isCreateQuizSuccessful: boolean;
  createQuizErrorMessage: string;

  // update quizzes by index
  isUpdateQuestionLoading: boolean;
  isUpdateQuestionSuccessful: boolean;
  updateQuestionErrorMessage: string;

  // store current question
  currentQuestion: Question;
  currentQuestionIndex: number;
  previousQuestionIndex: number;
  isStoreCurrentQuestionLoading: boolean;
  isStoreCurrentQuestionSuccessful: boolean;
  storeCurrentQuestionErrorMessage: string;
}
