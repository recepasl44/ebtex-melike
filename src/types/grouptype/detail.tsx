import { data } from './list'
import GroupTypeListStatus from '../../enums/grouptype/list'

export interface GroupTypeDetailState {
    data: data | null
    status: GroupTypeListStatus
    error: string | null
}
