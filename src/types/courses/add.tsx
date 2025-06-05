import { data } from './list';
import { CoursesListStatus } from '../../enums/courses/list';

export interface CoursesAddPayload {
    name: string;
    level_id: number;
}

export interface CoursesAddState {
    data: data | null;
    status: CoursesListStatus;
    error: string | null;
}