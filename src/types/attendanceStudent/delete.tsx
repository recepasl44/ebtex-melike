import { Data } from './list'
import AttendanceStudentListStatus from '../../enums/attendanceStudent/list'

export interface AttendanceStudentsDeletePayload {
    id?: number
}

export interface AttendanceStudentsDeleteState {
    data: Data | null
    status: AttendanceStudentListStatus
    error: string | null
}
