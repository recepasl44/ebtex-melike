import { data } from './list';
import {LessonsListStatus} from '../../enums/lessons/list';

export interface LessonUpdatePayload {
    lessonId: number;
    payload: {
        name: string;
        cover?: string | null;
    };
}

export interface LessonUpdateState {
    data: data | null;
    status: LessonsListStatus;
    error: string | null;
}
