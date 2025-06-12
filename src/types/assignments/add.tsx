import { AssignmentData } from './list'
import { AssignmentsListStatus } from '../../enums/assignments/list'

export interface AssignmentsAddPayload {
    id?: number
    teacher_id: number
    program_id: number
    level_id: number
    schooltype_id: number
    course_id: number
    class_section: string
    subject: string
    unit_topic: string
    title: string
    source_id: number
    start_date: string
    end_date: string
    description: string | null
    teacher_file: number | null
    planned_status: number
}

export interface AssignmentsAddState {
    data: AssignmentData | null
    status: AssignmentsListStatus
    error: string | null
}
