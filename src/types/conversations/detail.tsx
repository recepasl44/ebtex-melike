// file: src/types/conversations/detail.tsx
import { ConversationData } from './list'
import { ConversationListStatus } from '../../enums/conversations/list'

export interface ConversationsDetailState {
    data: ConversationData | null
    status: ConversationListStatus
    error: string | null
}
