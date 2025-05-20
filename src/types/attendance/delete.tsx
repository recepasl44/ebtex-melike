import { data } from './list'
import AttendanceListStatus from '../../enums/attendance/list'

export interface AttendancesDeletePayload {
    id?: number
}

export interface AttendancesDeleteState {
    data: data | null
    status: AttendanceListStatus
    error: string | null
}
