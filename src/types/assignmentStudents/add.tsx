import { AssignmentStudentData } from './list';
import AssignmentStudentsListStatus from '../../enums/assignmentStudents/list';

export interface AssignmentStudentsAddPayload {
    id: number;
    assignment_id: number;
    student_id: number;
    status?: number;
    completion_percentage?: number;
    delay_days?: number;
    student_file?: any;
}

export interface AssignmentStudentsAddState {
    data: AssignmentStudentData | null;
    status: AssignmentStudentsListStatus;
    error: string | null;
}
