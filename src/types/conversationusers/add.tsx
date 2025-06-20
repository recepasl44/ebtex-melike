// file: src/types/conversationusers/add.tsx
import { ConversationUsersData } from './list'
import { ConversationUserListStatus } from '../../enums/conversationusers/list'

export interface ConversationUsersAddPayload {
    id?: number
    conversation_id: number
    user_id: number
}

export interface ConversationUsersAddState {
    data: ConversationUsersData | null
    status: ConversationUserListStatus
    error: string | null
}
