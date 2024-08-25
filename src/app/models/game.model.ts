export interface SendQuestion {
  pin: string;
  questionId: string;
  correctAnswer: number;
}

export interface SendAnswer {
  pin: string;
  questionId: string;
  playerName: string;
  answer: number;
}
