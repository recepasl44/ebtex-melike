import { data } from './list';
import {QuestionTypeListStatus} from '../../enums/questiontypes/list'
export interface QuestionTypeAddPayload {
    name: string;
}

export interface QuestionTypeAddState {
    data: data | null;
    status: QuestionTypeListStatus;
    error: string | null;
}
