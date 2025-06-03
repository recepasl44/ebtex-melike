import { Data } from './list'
import StudentGroupListStatus from '../../enums/studentGroup/list'

export interface StudentGroupDetailState {
    data: Data | null
    status: StudentGroupListStatus
    error: string | null
}
