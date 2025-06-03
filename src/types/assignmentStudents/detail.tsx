import { AssignmentStudentData } from './list';
import AssignmentStudentsListStatus from '../../enums/assignmentStudents/list';

export interface AssignmentStudentsDetailState {
    data: AssignmentStudentData | null;
    status: AssignmentStudentsListStatus;
    error: string | null;
}
