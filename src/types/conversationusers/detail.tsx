// file: src/types/conversationusers/detail.tsx
import { ConversationUsersData } from './list'
import { ConversationUserListStatus } from '../../enums/conversationusers/list'

export interface ConversationUsersDetailState {
    data: ConversationUsersData | null
    status: ConversationUserListStatus
    error: string | null
}
