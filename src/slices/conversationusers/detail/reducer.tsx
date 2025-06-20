// file: src/slices/conversationusers/detail/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchConversationUser } from './thunk'
import { ConversationUsersDetailState } from '../../../types/conversationusers/detail'
import { ConversationUserListStatus } from '../../../enums/conversationusers/list'
import { ConversationUsersData } from '../../../types/conversationusers/list'

const initialState: ConversationUsersDetailState = {
    data: null,
    status: ConversationUserListStatus.IDLE,
    error: null,
}

const conversationUsersDetailSlice = createSlice({
    name: 'conversationUsersDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversationUser.pending, (state) => {
                state.status = ConversationUserListStatus.LOADING
                state.error = null
            })
            .addCase(fetchConversationUser.fulfilled, (state, action: PayloadAction<ConversationUsersData>) => {
                state.status = ConversationUserListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(fetchConversationUser.rejected, (state, action: PayloadAction<any>) => {
                state.status = ConversationUserListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default conversationUsersDetailSlice.reducer
