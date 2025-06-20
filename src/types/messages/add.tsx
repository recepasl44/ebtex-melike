// file: src\types\messages\add.tsx
import { MessageData } from './list'
import { MessageListStatus } from '../../enums/messages/list'

export interface MessagesAddPayload {
  id?: number
  conversation_id: number
  sender_id: number
  body: string
  read_at?: string | null
  status: number
}

export interface MessagesAddState {
  data: MessageData | null
  status: MessageListStatus
  error: string | null
}
