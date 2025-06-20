// file: src/slices/conversations/delete/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteConversation } from './thunk'
import { ConversationsDeleteState } from '../../../types/conversations/delete'
import { ConversationListStatus } from '../../../enums/conversations/list'

const initialState: ConversationsDeleteState = {
    data: null,
    status: ConversationListStatus.IDLE,
    error: null,
}

const conversationsDeleteSlice = createSlice({
    name: 'conversationsDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteConversation.pending, (state) => {
                state.status = ConversationListStatus.LOADING
                state.error = null
            })
            .addCase(deleteConversation.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = ConversationListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(deleteConversation.rejected, (state, action: PayloadAction<any>) => {
                state.status = ConversationListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default conversationsDeleteSlice.reducer
