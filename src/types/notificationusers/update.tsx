// file: src/types/notificationusers/update.tsx
import { NotificationUsersData } from './list'
import { NotificationUserListStatus } from '../../enums/notificationusers/list'

export interface NotificationUsersUpdatePayload {
    notificationUserId: number
    payload: {
        notification_id?: number | null
        user_id?: number | null
        read_at?: string | null
    }
}

export interface NotificationUsersUpdateState {
    data: NotificationUsersData | null
    status: NotificationUserListStatus
    error: string | null
}
