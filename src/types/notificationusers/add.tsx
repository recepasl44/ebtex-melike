// file: src/types/notificationusers/add.tsx
import { NotificationUsersData } from './list'
import { NotificationUserListStatus } from '../../enums/notificationusers/list'

export interface NotificationUsersAddPayload {
    id?: number
    notification_id: number
    user_id: number
    read_at?: string | null
}

export interface NotificationUsersAddState {
    data: NotificationUsersData | null
    status: NotificationUserListStatus
    error: string | null
}
