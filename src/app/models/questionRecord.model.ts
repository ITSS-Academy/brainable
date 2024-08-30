import { Question } from './question.model';

export interface QuestionRecord {
  id: string;
  gameId: string;
  countA: number;
  countB: number;
  countC: number;
  countD: number;
  question: Question;
}

export interface QuestionRecordDTO {
  gameId: string;
  question: Question;
  countA: number;
  countB: number;
  countC: number;
  countD: number;
}
