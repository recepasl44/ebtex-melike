import { Data } from './list'
import AttendanceStudentListStatus from '../../enums/attendanceStudent/list'

export interface AttendanceStudentsAddPayload {
    id: number
    attendance_id?: number
    student_id?: number
    [key: string]: any
}

export interface AttendanceStudentsAddState {
    data: Data | null
    status: AttendanceStudentListStatus
    error: string | null
}
