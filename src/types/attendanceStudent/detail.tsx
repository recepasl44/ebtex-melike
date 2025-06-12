import { Data } from './list'
import AttendanceStudentListStatus from '../../enums/attendanceStudent/list'

export interface AttendanceStudentDetailState {
    data: Data | null
    status: AttendanceStudentListStatus
    error: string | null
}
