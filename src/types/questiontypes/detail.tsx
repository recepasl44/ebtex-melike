import { data } from './list';
import {QuestionTypeListStatus} from '../../enums/questiontypes/list'
export interface QuestionTypeShowState {
    data: data | null;
    status: QuestionTypeListStatus;
    error: string | null;
}
