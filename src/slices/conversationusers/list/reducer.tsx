// file: src/slices/conversationusers/list/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchConversationUsers } from './thunk'
import { ListConversationUsersResponse } from '../../../types/conversationusers/list'
import { ConversationUserListStatus } from '../../../enums/conversationusers/list'

export interface ConversationUsersListState {
    data: ListConversationUsersResponse['data'] | null
    links: ListConversationUsersResponse['links'] | null
    meta: ListConversationUsersResponse['meta'] | null
    status: ConversationUserListStatus
    error: string | null
}

const initialState: ConversationUsersListState = {
    data: null,
    links: null,
    meta: null,
    status: ConversationUserListStatus.IDLE,
    error: null,
}

const conversationUsersListSlice = createSlice({
    name: 'conversationusers/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchConversationUsers.pending, (state) => {
            state.status = ConversationUserListStatus.LOADING
            state.error = null
        })
        builder.addCase(fetchConversationUsers.fulfilled, (state, action: PayloadAction<ListConversationUsersResponse>) => {
            state.status = ConversationUserListStatus.SUCCEEDED
            state.data = action.payload.data
            state.links = action.payload.links
            state.meta = action.payload.meta
        })
        builder.addCase(fetchConversationUsers.rejected, (state, action: PayloadAction<any>) => {
            state.status = ConversationUserListStatus.FAILED
            state.error = action.payload || 'Fetch conversation users failed'
        })
    },
})

export default conversationUsersListSlice.reducer
