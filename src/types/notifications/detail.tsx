// file: src/types/notifications/detail.tsx
import { NotificationData } from './list'
import NotificationListStatus from '../../enums/notifications/list'

export interface NotificationsDetailState {
    data: NotificationData | null
    status: NotificationListStatus
    error: string | null
}
