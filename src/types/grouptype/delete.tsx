import { data } from './list'
import GroupTypeListStatus from '../../enums/grouptype/list'

export interface GroupTypesDeletePayload {
    id?: number
}

export interface GroupTypesDeleteState {
    data: data | null
    status: GroupTypeListStatus
    error: string | null
}
