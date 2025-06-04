import { data } from './list';
import {QuestionDifficultListStatus} from '../../enums/questiondifficults/list'
export interface QuestionDifficultUpdatePayload {
    questionDifficultId: number;
    payload: {
        name: string;
    };
}

export interface QuestionDifficultUpdateState {
    data: data | null;
    status: QuestionDifficultListStatus;
    error: string | null;
}
