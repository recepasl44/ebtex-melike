import { AssignmentData } from './list'
import { AssignmentsListStatus } from '../../enums/assignments/list'

export interface AssignmentsDetailState {
    data: AssignmentData | null
    status: AssignmentsListStatus
    error: string | null
}
