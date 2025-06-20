// file: src/types/notifications/update.tsx
import { NotificationData } from './list'
import NotificationListStatus from '../../enums/notifications/list'

export interface NotificationsUpdatePayload {
    notificationId: number
    payload: {
        type_id?: number | null
        title?: string | null
        message?: string | null
        category_id?: number | null
        source_id?: number | null
        sender_id?: number | null
        send_time?: string | null
        status?: number | null
        group_id?: number | null
    }
}

export interface NotificationsUpdateState {
    data: NotificationData | null
    status: NotificationListStatus
    error: string | null
}
