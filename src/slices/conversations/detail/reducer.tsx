// file: src/slices/conversations/detail/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchConversation } from './thunk'
import { ConversationsDetailState } from '../../../types/conversations/detail'
import { ConversationListStatus } from '../../../enums/conversations/list'
import { ConversationData } from '../../../types/conversations/list'

const initialState: ConversationsDetailState = {
    data: null,
    status: ConversationListStatus.IDLE,
    error: null,
}

const conversationsDetailSlice = createSlice({
    name: 'conversationsDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversation.pending, (state) => {
                state.status = ConversationListStatus.LOADING
                state.error = null
            })
            .addCase(fetchConversation.fulfilled, (state, action: PayloadAction<ConversationData>) => {
                state.status = ConversationListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(fetchConversation.rejected, (state, action: PayloadAction<any>) => {
                state.status = ConversationListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default conversationsDetailSlice.reducer
