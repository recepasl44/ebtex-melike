// file: src/slices/messages/detail/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMessage } from './thunk'
import { MessagesDetailState } from '../../../types/messages/detail'
import { MessageListStatus } from '../../../enums/messages/list'
import { MessageData } from '../../../types/messages/list'

const initialState: MessagesDetailState = {
    data: null,
    status: MessageListStatus.IDLE,
    error: null,
}

const messagesDetailSlice = createSlice({
    name: 'messagesDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessage.pending, (state) => {
                state.status = MessageListStatus.LOADING
                state.error = null
            })
            .addCase(fetchMessage.fulfilled, (state, action: PayloadAction<MessageData>) => {
                state.status = MessageListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(fetchMessage.rejected, (state, action: PayloadAction<any>) => {
                state.status = MessageListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default messagesDetailSlice.reducer
