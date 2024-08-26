import { Question } from './question.model';
import { Categories } from './categories.model';

export interface Quiz {
  id: number;
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
    id: number;
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
  id: number;
  title: string;
  imgUrl: string;
  description: string;
  isPublic: boolean;
  createdAt: Date;
}
