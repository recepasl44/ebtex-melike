import { data } from './list';
import {QuestionDifficultListStatus} from '../../enums/questiondifficults/list'
export interface QuestionDifficultShowState {
    data: data | null;
    status: QuestionDifficultListStatus;
    error: string | null;
}
