// file: src/types/notificationusers/detail.tsx
import { NotificationUsersData } from './list'
import { NotificationUserListStatus } from '../../enums/notificationusers/list'

export interface NotificationUsersDetailState {
    data: NotificationUsersData | null
    status: NotificationUserListStatus
    error: string | null
}
