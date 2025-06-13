import { AssignmentData } from './list'
import { AssignmentsListStatus } from '../../enums/assignments/list'

export interface AssignmentsDeletePayload {
    id?: number
}

export interface AssignmentsDeleteState {
    data: AssignmentData | null
    status: AssignmentsListStatus
    error: string | null
}
