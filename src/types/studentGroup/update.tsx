import { Data } from './list'
import StudentGroupListStatus from '../../enums/studentGroup/list'

export interface StudentGroupsUpdatePayload {
    studentGroupId: number
    payload: {
        student_id?: number
        group_id?: number
        [key: string]: any
    }
}

export interface StudentGroupsUpdateState {
    data: Data | null
    status: StudentGroupListStatus
    error: string | null
}
