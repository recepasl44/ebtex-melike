import { data } from './list';
import {ExamRelevanceListStatus} from '../../enums/examrelevances/list';

export interface ExamRelevanceUpdatePayload {
    examRelevanceId: number;
    payload: {
        name: string;
    };
}

export interface ExamRelevanceUpdateState {
    data: data | null;
    status: ExamRelevanceListStatus;
    error: string | null;
}
