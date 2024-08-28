export interface GameState {
  pin: string | null;
  currentQuestion: number;
  playerName: string;
  playerAnswer: number;
  totalPlayers: number;
  timeElapsed: number;
  score: number;
}
