// file: src/types/conversationusers/delete.tsx
import { ConversationUsersData } from './list'
import { ConversationUserListStatus } from '../../enums/conversationusers/list'

export interface ConversationUsersDeletePayload {
    id?: number
}

export interface ConversationUsersDeleteState {
    data: ConversationUsersData | null
    status: ConversationUserListStatus
    error: string | null
}
