import { PlayerRecord } from "../../models/playerRecord.model";

export interface PlayerRecordState {
    playerRecords: PlayerRecord[];
    playerRecord: PlayerRecord | null;

    isGetPlayerRecordsLoading: boolean;
    isGetPlayerRecordsSuccessful: boolean;
    getPlayerRecordsErrorMessage: string;

    isGetPlayerRecordLoading: boolean;
    isGetPlayerRecordSuccessful: boolean;
    getPlayerRecordErrorMessage: string;

    isCreatePlayerRecordLoading: boolean;
    isCreatePlayerRecordSuccessful: boolean;
    createPlayerRecordErrorMessage: string;
}