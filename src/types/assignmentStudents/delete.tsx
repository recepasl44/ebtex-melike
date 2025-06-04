import { AssignmentStudentData } from './list';
import AssignmentStudentsListStatus from '../../enums/assignmentStudents/list';

export interface AssignmentStudentsDeletePayload {
    id?: number;
}

export interface AssignmentStudentsDeleteState {
    data: AssignmentStudentData | null;
    status: AssignmentStudentsListStatus;
    error: string | null;
}
