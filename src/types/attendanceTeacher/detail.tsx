import { Data } from './list'
import AttendanceTeacherListStatus from '../../enums/attendanceTeacher/list'

export interface AttendanceTeacherDetailState {
    data: Data | null
    status: AttendanceTeacherListStatus
    error: string | null
}
