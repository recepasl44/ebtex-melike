import { AttendanceData } from './list'
import AttendanceListStatus from '../../enums/attendance/list'

export interface AttendancesUpdatePayload {
    attendanceId: number
    payload: {
        name?: string
        group_type_id?: number
        group_id?: number
        program_id?: number
        level_id?: number
        start_date?: string
        end_date?: string
        start_time?: string
        used_area_id?: number
        status?: number
        [key: string]: any
    }
}

export interface AttendancesUpdateState {
    data: AttendanceData | null
    status: AttendanceListStatus
    error: string | null
}
