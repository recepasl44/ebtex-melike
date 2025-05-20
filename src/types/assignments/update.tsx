import { AssignmentData } from './list'
import { AssignmentsListStatus } from '../../enums/assignments/list'

export interface AssignmentsUpdatePayload {
    assignmentId: number
    payload: {
        teacher_id: number | null
        program_id?: number | null
        level_id?: number | null
        schooltype_id?: number | null
        course_id?: number | null
        class_section?: string | null
        subject?: string | null
        unit_topic?: string | null
        title?: string | null
        source_id?: number | null
        start_date?: string | null
        end_date?: string | null
        description?: string | null
        teacher_file?: number | null
        planned_status?: number | null
    }
}

export interface AssignmentsUpdateState {
    data: AssignmentData | null
    status: AssignmentsListStatus
    error: string | null
}
