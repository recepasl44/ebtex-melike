// file: src/types/conversationusers/update.tsx
import { ConversationUsersData } from './list'
import { ConversationUserListStatus } from '../../enums/conversationusers/list'

export interface ConversationUsersUpdatePayload {
    conversationUserId: number
    payload: {
        conversation_id?: number | null
        user_id?: number | null
    }
}

export interface ConversationUsersUpdateState {
    data: ConversationUsersData | null
    status: ConversationUserListStatus
    error: string | null
}
