import { data } from './list';
import {QuestionTypeListStatus} from '../../enums/questiontypes/list'
export interface QuestionTypeDeletePayload {
    id: number;
}

export interface QuestionTypeDeleteState {
    data: data | null;
    status: QuestionTypeListStatus;
    error: string | null;
}
