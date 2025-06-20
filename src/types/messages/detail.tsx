// file: src\types\messages\detail.tsx
import { MessageData } from './list'
import { MessageListStatus } from '../../enums/messages/list'

export interface MessagesDetailState {
  data: MessageData | null
  status: MessageListStatus
  error: string | null
}
