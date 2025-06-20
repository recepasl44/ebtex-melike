// file: src/types/conversations/delete.tsx
import { ConversationData } from './list'
import { ConversationListStatus } from '../../enums/conversations/list'

export interface ConversationsDeletePayload {
    id?: number
}

export interface ConversationsDeleteState {
    data: ConversationData | null
    status: ConversationListStatus
    error: string | null
}
