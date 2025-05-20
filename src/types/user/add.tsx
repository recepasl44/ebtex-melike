import { UserData } from './list'
import UserListStatus from '../../enums/user/list'

export interface UserAddPayload {
    id: number
    first_name: string
    last_name: string
    email: string
    [key: string]: any
}

export interface UserAddState {
    data: UserData | null
    status: UserListStatus
    error: string | null
}
