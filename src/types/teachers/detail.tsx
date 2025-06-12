import { TeacherData } from './list';
import TeachersListStatus from '../../enums/teachers/list';

export interface TeacherShowState {
    data: TeacherData | null;
    status: TeachersListStatus;
    error: string | null;
}
