import { data } from './list';
import {LessonsListStatus} from '../../enums/lessons/list';

export interface LessonDeletePayload {
    id: number;
}

export interface LessonDeleteState {
    data: data | null;
    status: LessonsListStatus;
    error: string | null;
}
