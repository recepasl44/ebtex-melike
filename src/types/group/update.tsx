import { data } from './list'
import GroupListStatus from '../../enums/group/list'

export interface GroupsUpdatePayload {
    groupId: number
    payload: {
        name?: string
    }
}

export interface GroupsUpdateState {
    data: data | null
    status: GroupListStatus
    error: string | null
}
