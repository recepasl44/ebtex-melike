import { data } from './list';
import {LessonsListStatus} from '../../enums/lessons/list';
export interface LessonAddPayload {
    name: string;
    cover?: string | null;
}

export interface LessonAddState {
    data: data | null;
    status: LessonsListStatus;
    error: string | null;
}
