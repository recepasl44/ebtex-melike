import { Data } from './list'
import AttendanceDayListStatus from '../../enums/attendanceDay/list'

export interface AttendanceDaysAddPayload {
    id: number
    attendance_id?: number
    day_id?: string
    [key: string]: any
}

export interface AttendanceDaysAddState {
    data: Data | null
    status: AttendanceDayListStatus
    error: string | null
}
