// file: src/slices/conversationusers/delete/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteConversationUser } from './thunk'
import { ConversationUsersDeleteState } from '../../../types/conversationusers/delete'
import { ConversationUserListStatus } from '../../../enums/conversationusers/list'

const initialState: ConversationUsersDeleteState = {
    data: null,
    status: ConversationUserListStatus.IDLE,
    error: null,
}

const conversationUsersDeleteSlice = createSlice({
    name: 'conversationUsersDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteConversationUser.pending, (state) => {
                state.status = ConversationUserListStatus.LOADING
                state.error = null
            })
            .addCase(deleteConversationUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = ConversationUserListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(deleteConversationUser.rejected, (state, action: PayloadAction<any>) => {
                state.status = ConversationUserListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default conversationUsersDeleteSlice.reducer
