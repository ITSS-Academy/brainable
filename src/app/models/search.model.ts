import { Question } from './question.model';
import { Categories } from './categories.model';

export interface SearchModel {
  _id: string;
  _index: string;
  _score: number;
  _source: {
    id: string;
    title: string;
    description: string;
    isPublic: boolean;
    imgUrl: string;
    category: Categories;
    questions: Question[];
  };
}
