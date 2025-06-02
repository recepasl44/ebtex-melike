import { Data } from './list'
import StudentGroupListStatus from '../../enums/studentGroup/list'

export interface StudentGroupsDeletePayload {
    id?: number
}

export interface StudentGroupsDeleteState {
    data: Data | null
    status: StudentGroupListStatus
    error: string | null
}
