// file: src/slices/messages/delete/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteMessage } from './thunk'
import { MessagesDeleteState } from '../../../types/messages/delete'
import { MessageListStatus } from '../../../enums/messages/list'

const initialState: MessagesDeleteState = {
    data: null,
    status: MessageListStatus.IDLE,
    error: null,
}

const messagesDeleteSlice = createSlice({
    name: 'messagesDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteMessage.pending, (state) => {
                state.status = MessageListStatus.LOADING
                state.error = null
            })
            .addCase(deleteMessage.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = MessageListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(deleteMessage.rejected, (state, action: PayloadAction<any>) => {
                state.status = MessageListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default messagesDeleteSlice.reducer
