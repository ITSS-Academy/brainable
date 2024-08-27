import { Question } from './question.model';
import { Categories } from './categories.model';

export interface Quiz {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  totalQuestions: number;
  imgUrl: string;
  createdAt: Date;
  category: Categories;
  questions: Question[];
}

export interface QuizDTO {
  quiz: {
    id: string;
    title: string;
    description: string;
    isPublic: boolean;
    totalQuestions: number;
    imgUrl: string;
    createdAt: Date;
    category: Categories;
    questions: Question[];
  };
}

export interface QuizByCategory {
  id: string;
  title: string;
  imgUrl: string;
  description: string;
  isPublic: boolean;
  createdAt: Date;
}
