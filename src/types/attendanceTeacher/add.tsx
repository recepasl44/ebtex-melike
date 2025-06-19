import { Data } from './list'
import AttendanceTeacherListStatus from '../../enums/attendanceTeacher/list'

export interface AttendanceTeachersAddPayload {
    id: number
    attendance_id?: number
    teacher_id?: number
    [key: string]: any
}

export interface AttendanceTeachersAddState {
    data: Data | null
    status: AttendanceTeacherListStatus
    error: string | null
}
