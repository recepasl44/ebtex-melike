import { data } from './list'
import GroupListStatus from '../../enums/group/list'

export interface GroupsDeletePayload {
    id?: number
}

export interface GroupsDeleteState {
    data: data | null
    status: GroupListStatus
    error: string | null
}
