import { AttendanceData } from './list'
import AttendanceListStatus from '../../enums/attendance/list'

export interface AttendanceDetailState {
    data: AttendanceData | null
    status: AttendanceListStatus
    error: string | null
}
