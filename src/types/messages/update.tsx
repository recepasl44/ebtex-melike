// file: src\types\messages\update.tsx
import { MessageData } from './list'
import { MessageListStatus } from '../../enums/messages/list'

export interface MessagesUpdatePayload {
  messageId: number
  payload: {
    conversation_id?: number
    sender_id?: number
    body?: string
    read_at?: string | null
    status?: number
  }
}

export interface MessagesUpdateState {
  data: MessageData | null
  status: MessageListStatus
  error: string | null
}
