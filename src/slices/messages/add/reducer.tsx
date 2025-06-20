// file: src/slices/messages/add/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addMessage } from './thunk'
import { MessagesAddState } from '../../../types/messages/add'
import { MessageListStatus } from '../../../enums/messages/list'
import { MessageData } from '../../../types/messages/list'

const initialState: MessagesAddState = {
    data: null,
    status: MessageListStatus.IDLE,
    error: null,
}

const messagesAddSlice = createSlice({
    name: 'messagesAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addMessage.pending, (state) => {
                state.status = MessageListStatus.LOADING
                state.error = null
            })
            .addCase(addMessage.fulfilled, (state, action: PayloadAction<MessageData>) => {
                state.status = MessageListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(addMessage.rejected, (state, action: PayloadAction<any>) => {
                state.status = MessageListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default messagesAddSlice.reducer
