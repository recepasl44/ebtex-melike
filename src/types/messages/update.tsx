// file: src/types/messages/update.tsx
import { MessageData } from './list'
import MessageListStatus from '../../enums/messages/list'

export interface MessagesUpdatePayload {
    messageId: number
    payload: {
        conversation_id?: number | null
        sender_id?: number | null
        body?: string | null
        read_at?: string | null
        status?: number | null
    }
}

export interface MessagesUpdateState {
    data: MessageData | null
    status: MessageListStatus
    error: string | null
}
