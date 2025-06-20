// file: src\types\messages\delete.tsx
import { MessageData } from './list'
import { MessageListStatus } from '../../enums/messages/list'

export interface MessagesDeletePayload {
  id?: number
}

export interface MessagesDeleteState {
  data: MessageData | null
  status: MessageListStatus
  error: string | null
}
