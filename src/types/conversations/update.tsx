// file: src/types/conversations/update.tsx
import { ConversationData } from './list'
import { ConversationListStatus } from '../../enums/conversations/list'

export interface ConversationsUpdatePayload {
    conversationId: number
    payload: {
        name?: string | null
        type_id?: string | null
        user_one_id?: number | null
        user_two_id?: number | null
    }
}

export interface ConversationsUpdateState {
    data: ConversationData | null
    status: ConversationListStatus
    error: string | null
}
