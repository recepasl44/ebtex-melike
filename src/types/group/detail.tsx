import { data } from './list'
import GroupListStatus from '../../enums/group/list'

export interface GroupDetailState {
    data: data | null
    status: GroupListStatus
    error: string | null
}
