import { data } from './list';
import {ExamRelevanceListStatus} from '../../enums/examrelevances/list';

export interface ExamRelevanceDeletePayload {
    id: number;
}

export interface ExamRelevanceDeleteState {
    data: data | null;
    status: ExamRelevanceListStatus;
    error: string | null;
}
