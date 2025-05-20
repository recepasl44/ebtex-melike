import { UserData } from './list'
import UserListStatus from '../../enums/user/list'

export interface UserDeletePayload {
    id?: number
}

export interface UserDeleteState {
    data: UserData | null
    status: UserListStatus
    error: string | null
}
