import { data } from './list';
import {QuestionDifficultListStatus} from '../../enums/questiondifficults/list'
export interface QuestionDifficultAddPayload {
    name: string;
}

export interface QuestionDifficultAddState {
    data: data | null;
    status: QuestionDifficultListStatus;
    error: string | null;
}
