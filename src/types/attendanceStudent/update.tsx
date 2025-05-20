import { Data } from './list'
import AttendanceStudentListStatus from '../../enums/attendanceStudent/list'

export interface AttendanceStudentsUpdatePayload {
    attendanceStudentId: number
    payload: {
        attendance_id?: number
        student_id?: number
        [key: string]: any
    }
}

export interface AttendanceStudentsUpdateState {
    data: Data | null
    status: AttendanceStudentListStatus
    error: string | null
}
