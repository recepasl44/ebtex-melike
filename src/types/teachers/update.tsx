import { TeacherData } from './list';
import TeachersListStatus from '../../enums/teachers/list';

export interface TeachersUpdatePayload {
    teacherId: number;
    payload: {
        personel_id?: number;
        name_surname?: string;
        short_name?: string;
        branch?: string;
        class_teacher_id?: number;
        social_club?: string;
        email?: string;
    };
}

export interface TeachersUpdateState {
    data: TeacherData | null;
    status: TeachersListStatus;
    error: string | null;
}
