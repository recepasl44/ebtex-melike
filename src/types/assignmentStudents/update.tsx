import { AssignmentStudentData } from './list';
import AssignmentsListStatus from '../../enums/assignmentStudents/list';

export interface AssignmentStudentsUpdatePayload {
    assignmentStudentId: number;
    payload: {
        assigment_id?: number;
        student_id?: number;
        status?: number;
        completion_percentage?: number;
        delay_days?: number;
        student_file?: any;
    };
}

export interface AssignmentStudentsUpdateState {
    data: AssignmentStudentData | null;
    status: AssignmentsListStatus;
    error: string | null;
}
