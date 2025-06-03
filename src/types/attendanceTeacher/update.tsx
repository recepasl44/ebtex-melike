import { Data } from './list'
import AttendanceTeacherListStatus from '../../enums/attendanceTeacher/list'

export interface AttendanceTeachersUpdatePayload {
    attendanceTeacherId: number
    payload: {
        attendance_id?: number
        teacher_id?: number
        [key: string]: any
    }
}

export interface AttendanceTeachersUpdateState {
    data: Data | null
    status: AttendanceTeacherListStatus
    error: string | null
}
