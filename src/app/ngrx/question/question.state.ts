import { Question, QuestionDTO } from '../../models/question.model';

export interface QuestionState {
  //   create question
  createQuestion: QuestionDTO;
  isCreateQuestionLoading: boolean;
  isCreateQuestionSuccessful: boolean;
  createQuestionErrorMessage: string;

  //   get questions
  getQuestions: Question;
  isGetQuestionsLoading: boolean;
  isGetQuestionsSuccessful: boolean;
  getQuestionsErrorMessage: string;
}
