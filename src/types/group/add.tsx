import { data } from './list'
import GroupListStatus from '../../enums/group/list'

export interface GroupsAddPayload {
    id: number
    name: string
}

export interface GroupsAddState {
    data: data | null
    status: GroupListStatus
    error: string | null
}
