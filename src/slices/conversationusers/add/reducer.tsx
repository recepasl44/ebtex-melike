// file: src/slices/conversationusers/add/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addConversationUser } from './thunk'
import { ConversationUsersAddState } from '../../../types/conversationusers/add'
import { ConversationUserListStatus } from '../../../enums/conversationusers/list'
import { ConversationUsersData } from '../../../types/conversationusers/list'

const initialState: ConversationUsersAddState = {
    data: null,
    status: ConversationUserListStatus.IDLE,
    error: null,
}

const conversationUsersAddSlice = createSlice({
    name: 'conversationUsersAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addConversationUser.pending, (state) => {
                state.status = ConversationUserListStatus.LOADING
                state.error = null
            })
            .addCase(addConversationUser.fulfilled, (state, action: PayloadAction<ConversationUsersData>) => {
                state.status = ConversationUserListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(addConversationUser.rejected, (state, action: PayloadAction<any>) => {
                state.status = ConversationUserListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default conversationUsersAddSlice.reducer
