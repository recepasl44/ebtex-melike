import { data } from './list'
import GroupTypeListStatus from '../../enums/grouptype/list'

export interface GroupTypesAddPayload {
    id: number
    name: string
}

export interface GroupTypesAddState {
    data: data | null
    status: GroupTypeListStatus
    error: string | null
}
