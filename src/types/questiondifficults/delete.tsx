import { data } from './list';
import {QuestionDifficultListStatus} from '../../enums/questiondifficults/list'
export interface QuestionDifficultDeletePayload {
    id: number;
}

export interface QuestionDifficultDeleteState {
    data: data | null;
    status: QuestionDifficultListStatus;
    error: string | null;
}
