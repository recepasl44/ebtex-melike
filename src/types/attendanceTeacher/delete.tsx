import { Data } from './list'
import AttendanceTeacherListStatus from '../../enums/attendanceTeacher/list'

export interface AttendanceTeachersDeletePayload {
    id?: number
}

export interface AttendanceTeachersDeleteState {
    data: Data | null
    status: AttendanceTeacherListStatus
    error: string | null
}
