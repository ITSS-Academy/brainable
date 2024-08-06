import { Quiz } from './quiz.model';

export interface Profile {
  uid: string;
  fullName: string;
  email: string;
  photoUrl: string;
  quizzes: Quiz[];
  // games: any[];
}
