import { QuestionRecord } from "../../models/questionRecord.model";

export interface QuetionReportState {
    questionRecords: QuestionRecord[];
    questionRecord: QuestionRecord | null;

    isGetQuetionRecordsLoading: boolean;
    isGetQuetionRecordsSuccessful: boolean;
    getQuetionRecordsErrorMessage: string;

    isGetQuetionRecordLoading: boolean;
    isGetQuetionRecordSuccessful: boolean;
    getQuetionRecordErrorMessage: string;

    isCreateQuetionRecordLoading: boolean;
    isCreateQuetionRecordSuccessful: boolean;
    createQuetionRecordErrorMessage: string;
    
}