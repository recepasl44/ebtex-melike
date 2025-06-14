import { Data } from './list'
import AttendanceDayListStatus from '../../enums/attendanceDay/list'

export interface AttendanceDayDetailState {
    data: Data | null
    status: AttendanceDayListStatus
    error: string | null
}
