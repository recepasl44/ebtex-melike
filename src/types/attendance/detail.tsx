import { data } from './list'
import AttendanceListStatus from '../../enums/attendance/list'

export interface AttendanceDetailState {
    data: data | null
    status: AttendanceListStatus
    error: string | null
}
