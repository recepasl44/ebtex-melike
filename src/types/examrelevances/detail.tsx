import { data } from './list';
import {ExamRelevanceListStatus} from '../../enums/examrelevances/list';

export interface ExamRelevanceShowState {
    data: data | null;
    status: ExamRelevanceListStatus;
    error: string | null;
}
