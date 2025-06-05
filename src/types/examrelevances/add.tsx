import { data } from './list';
import {ExamRelevanceListStatus} from '../../enums/examrelevances/list';
export interface ExamRelevanceAddPayload {
    name: string;
}

export interface ExamRelevanceAddState {
    data: data | null;
    status: ExamRelevanceListStatus;
    error: string | null;
}
