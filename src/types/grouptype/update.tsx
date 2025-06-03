import { data } from './list'
import GroupTypeListStatus from '../../enums/grouptype/list'

export interface GroupTypesUpdatePayload {
    groupTypeId: number
    payload: {
        name?: string
    }
}

export interface GroupTypesUpdateState {
    data: data | null
    status: GroupTypeListStatus
    error: string | null
}
