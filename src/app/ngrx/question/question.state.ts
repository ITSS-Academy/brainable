import { Question, QuestionDTO } from '../../models/question.model';

export interface QuestionState {
  //   create question
  createQuestion: QuestionDTO;
  isCreateQuestionLoading: boolean;
  isCreateQuestionSuccessful: boolean;
  createQuestionErrorMessage: string;

  //   get questions by quiz id
  questions: Question[];
  isGetQuestionsByQuizIdLoading: boolean;
  isGetQuestionsByQuizIdSuccessful: boolean;
  getQuestionsByQuizIdErrorMessage: string;
}
