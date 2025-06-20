// file: src/types/conversations/add.tsx
import { ConversationData } from './list'
import { ConversationListStatus } from '../../enums/conversations/list'

export interface ConversationsAddPayload {
    id?: number
    name: string
    type_id: string
    user_one_id: number
    user_two_id: number
}

export interface ConversationsAddState {
    data: ConversationData | null
    status: ConversationListStatus
    error: string | null
}
