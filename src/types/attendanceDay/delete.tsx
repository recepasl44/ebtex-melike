import { Data } from './list'
import AttendanceDayListStatus from '../../enums/attendanceDay/list'

export interface AttendanceDaysDeletePayload {
    id?: number
}

export interface AttendanceDaysDeleteState {
    data: Data | null
    status: AttendanceDayListStatus
    error: string | null
}
