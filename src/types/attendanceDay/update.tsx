import { Data } from './list'
import AttendanceDayListStatus from '../../enums/attendanceDay/list'

export interface AttendanceDaysUpdatePayload {
    attendanceDayId: number
    payload: {
        attendance_id?: number
        day_id?: string
        [key: string]: any
    }
}

export interface AttendanceDaysUpdateState {
    data: Data | null
    status: AttendanceDayListStatus
    error: string | null
}
