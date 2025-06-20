// file: src/slices/conversationusers/update/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { updateConversationUser } from './thunk'
import { ConversationUsersUpdateState } from '../../../types/conversationusers/update'
import { ConversationUserListStatus } from '../../../enums/conversationusers/list'
import { ConversationUsersData } from '../../../types/conversationusers/list'

const initialState: ConversationUsersUpdateState = {
    data: null,
    status: ConversationUserListStatus.IDLE,
    error: null,
}

const conversationUsersUpdateSlice = createSlice({
    name: 'conversationUsersUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateConversationUser.pending, (state) => {
                state.status = ConversationUserListStatus.LOADING
                state.error = null
            })
            .addCase(updateConversationUser.fulfilled, (state, action: PayloadAction<ConversationUsersData>) => {
                state.status = ConversationUserListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(updateConversationUser.rejected, (state, action: PayloadAction<any>) => {
                state.status = ConversationUserListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default conversationUsersUpdateSlice.reducer
