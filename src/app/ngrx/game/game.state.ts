export interface GameState {
  pin: string | null;
  currentQuestion: number;
  playerName: string;
  playerAnswer: number;
  totalPlayers: number;
  totalQuestions: number;
  clientId: string;

  previousResult: {
    playerName: string;
    score: number;
  }[];
}
