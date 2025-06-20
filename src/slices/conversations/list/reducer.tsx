// file: src/slices/conversations/list/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchConversations } from './thunk'
import { ListConversationsResponse } from '../../../types/conversations/list'
import { ConversationListStatus } from '../../../enums/conversations/list'

export interface ConversationsListState {
    data: ListConversationsResponse['data'] | null
    links: ListConversationsResponse['links'] | null
    meta: ListConversationsResponse['meta'] | null
    status: ConversationListStatus
    error: string | null
}

const initialState: ConversationsListState = {
    data: null,
    links: null,
    meta: null,
    status: ConversationListStatus.IDLE,
    error: null,
}

const conversationsListSlice = createSlice({
    name: 'conversations/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchConversations.pending, (state) => {
            state.status = ConversationListStatus.LOADING
            state.error = null
        })
        builder.addCase(fetchConversations.fulfilled, (state, action: PayloadAction<ListConversationsResponse>) => {
            state.status = ConversationListStatus.SUCCEEDED
            state.data = action.payload.data
            state.links = action.payload.links
            state.meta = action.payload.meta
        })
        builder.addCase(fetchConversations.rejected, (state, action: PayloadAction<any>) => {
            state.status = ConversationListStatus.FAILED
            state.error = action.payload || 'Fetch conversations failed'
        })
    },
})

export default conversationsListSlice.reducer
