import { GameReport } from '../../models/gameReport.model';

export interface GameReportState {
  gameReports: GameReport[];
  gameReport: GameReport | null;
  gameId: string;

  isGetGameReportsLoading: boolean;
  isGetGameReportsSuccessful: boolean;
  getGameReportsErrorMessage: string;

  isGetGameReportLoading: boolean;
  isGetGameReportSuccessful: boolean;
  getGameReportErrorMessage: string;

  isCreateGameReportLoading: boolean;
  isCreateGameReportSuccessful: boolean;
  createGameReportErrorMessage: string;
}
