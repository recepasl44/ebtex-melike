// file: src/types/notificationusers/delete.tsx
import { NotificationUsersData } from './list'
import { NotificationUserListStatus } from '../../enums/notificationusers/list'

export interface NotificationUsersDeletePayload {
    id?: number
}

export interface NotificationUsersDeleteState {
    data: NotificationUsersData | null
    status: NotificationUserListStatus
    error: string | null
}
