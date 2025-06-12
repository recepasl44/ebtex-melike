import { AttendanceData } from './list'
import AttendanceListStatus from '../../enums/attendance/list'

export interface AttendancesDeletePayload {
    id?: number
}

export interface AttendancesDeleteState {
    data: AttendanceData | null
    status: AttendanceListStatus
    error: string | null
}
