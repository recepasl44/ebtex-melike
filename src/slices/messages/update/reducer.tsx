// file: src\slices\messages\update\reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { updateMessage } from './thunk'
import { MessagesUpdateState } from '../../../types/messages/update'
import { MessageListStatus } from '../../../enums/messages/list'
import { MessageData } from '../../../types/messages/list'

const initialState: MessagesUpdateState = {
  data: null,
  status: MessageListStatus.IDLE,
  error: null,
}

const messagesUpdateSlice = createSlice({
  name: 'messagesUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateMessage.pending, (state) => {
      state.status = MessageListStatus.LOADING
      state.error = null
    })
    builder.addCase(updateMessage.fulfilled, (state, action: PayloadAction<MessageData>) => {
      state.status = MessageListStatus.SUCCEEDED
      state.data = action.payload
    })
    builder.addCase(updateMessage.rejected, (state, action: PayloadAction<any>) => {
      state.status = MessageListStatus.FAILED
      state.error = action.payload
    })
  },
})

export default messagesUpdateSlice.reducer
