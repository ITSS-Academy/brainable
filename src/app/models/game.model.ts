import { Quiz } from './quiz.model';

export interface SendQuestion {
  pin: string;
  questionId: string;
  correctAnswer: number;
  points: number;
  timeLimit: number;
}

export interface SendAnswer {
  pin: string;
  questionId: string;
  playerName: string;
  answer: number;
  time: number;
}

export interface AnswerStatistics {
  answerStatistics: {
    1: number;
    2: number;
    3: number;
    4: number;
  };
}
