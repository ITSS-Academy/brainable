import { GameRecord } from "./gameRecord.model";
import { Quiz } from "./quiz.model";

export interface GameReport {
    id: string;
    joinCode: string;
    hostId: string;
    quizId: Quiz;
    gameRecords: GameRecord[];
    createdAt: Date;
    index: number
    totalQuestions: number;
  }