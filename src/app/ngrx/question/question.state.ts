import { Question } from '../../models/question.model';

export interface QuestionState {
  //   get questions by quiz id
  questions: Question[];
  isGetQuestionsByQuizIdLoading: boolean;
  isGetQuestionsByQuizIdSuccessful: boolean;
  getQuestionsByQuizIdErrorMessage: string;
}
