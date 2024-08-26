import { QuizByCategory } from './quiz.model';

export interface Categories {
  uid: string;
  name: string;
  imgUrl: string;
}

export interface CategoriesByUid {
  uid: string;
  name: string;
  imgUrl: string;
  quizzes: QuizByCategory[];
}
