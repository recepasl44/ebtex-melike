import { Data } from './list'
import StudentGroupListStatus from '../../enums/studentGroup/list'

export interface StudentGroupsAddPayload {
    id: number
    student_id?: number
    group_id?: number
    [key: string]: any
}

export interface StudentGroupsAddState {
    data: Data | null
    status: StudentGroupListStatus
    error: string | null
}
