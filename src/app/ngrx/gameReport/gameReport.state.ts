import { GameReport } from "../../models/gameReport.model";

export interface GameReportState {
    gameReports: GameReport[];
    gameReport: GameReport | null;
    isGetGameReportsLoading: boolean;
    isGetGameReportsSuccessful: boolean;
    getGameReportsErrorMessage: string;

    isGetGameReportLoading: boolean;
    isGetGameReportSuccessful: boolean;
    getGameReportErrorMessage: string;
    
}