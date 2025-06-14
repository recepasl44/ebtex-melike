import { data } from './list';
import {QuestionTypeListStatus} from '../../enums/questiontypes/list'
export interface QuestionTypeUpdatePayload {
    questionTypeId: number;
    payload: {
        name: string;
    };
}

export interface QuestionTypeUpdateState {
    data: data | null;
    status: QuestionTypeListStatus;
    error: string | null;
}
