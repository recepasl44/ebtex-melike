import { TeacherData } from './list';
import TeachersListStatus from '../../enums/teachers/list';

export interface TeachersDeletePayload {
    id?: number;
}

export interface TeachersDeleteState {
    data: TeacherData | null;
    status: TeachersListStatus;
    error: string | null;
}
