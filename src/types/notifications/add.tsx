// file: src/types/notifications/add.tsx
import { NotificationData } from './list'
import NotificationListStatus from '../../enums/notifications/list'

export interface NotificationsAddPayload {
    id?: number
    type_id: number
    title?: string | null
    message?: string | null
    category_id?: number | null
    source_id?: number | null
    sender_id?: number | null
    send_time?: string
    status?: number
    group_id?: number | null
}

export interface NotificationsAddState {
    data: NotificationData | null
    status: NotificationListStatus
    error: string | null
}
