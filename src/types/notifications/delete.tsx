// file: src/types/notifications/delete.tsx
import { NotificationData } from './list'
import NotificationListStatus from '../../enums/notifications/list'

export interface NotificationsDeletePayload {
    id?: number
}

export interface NotificationsDeleteState {
    data: NotificationData | null
    status: NotificationListStatus
    error: string | null
}
