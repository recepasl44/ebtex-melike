// file: src/slices/conversations/update/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { updateConversation } from './thunk'
import { ConversationsUpdateState } from '../../../types/conversations/update'
import { ConversationListStatus } from '../../../enums/conversations/list'
import { ConversationData } from '../../../types/conversations/list'

const initialState: ConversationsUpdateState = {
    data: null,
    status: ConversationListStatus.IDLE,
    error: null,
}

const conversationsUpdateSlice = createSlice({
    name: 'conversationsUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateConversation.pending, (state) => {
                state.status = ConversationListStatus.LOADING
                state.error = null
            })
            .addCase(updateConversation.fulfilled, (state, action: PayloadAction<ConversationData>) => {
                state.status = ConversationListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(updateConversation.rejected, (state, action: PayloadAction<any>) => {
                state.status = ConversationListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default conversationsUpdateSlice.reducer
