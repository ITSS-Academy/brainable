import { Question } from './question.model';

export interface Quiz {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  createdAt: Date;
  questions: Question[];
}

export interface QuizDTO {
  quiz: {
    title: string;
    description: string;
    isPublic: boolean;
  };
}
