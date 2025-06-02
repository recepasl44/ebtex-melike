import { data } from './list';
import {LessonsListStatus} from '../../enums/lessons/list';

export interface LessonShowState {
    data: data | null;
    status: LessonsListStatus;
    error: string | null;
}
