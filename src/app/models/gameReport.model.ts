import { PlayerRecord } from './playerRecord.model';
import { Quiz } from './quiz.model';

export interface GameReport {
  id: string;
  joinCode: string;
  hostId: string;
  quizId: Quiz;
  gameRecords: PlayerRecord[];
  createdAt: Date;
  index: number;
  totalQuestions: number;
}

export interface GameReportDTO {}
