// file: src\slices\messages\list\reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMessages } from './thunk'
import { ListMessagesResponse } from '../../../types/messages/list'
import { MessageListStatus } from '../../../enums/messages/list'

export interface MessagesListState {
  data: ListMessagesResponse['data'] | null
  links: ListMessagesResponse['links'] | null
  meta: ListMessagesResponse['meta'] | null
  status: MessageListStatus
  error: string | null
}

const initialState: MessagesListState = {
  data: null,
  links: null,
  meta: null,
  status: MessageListStatus.IDLE,
  error: null,
}

const messagesListSlice = createSlice({
  name: 'messages/list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.pending, (state) => {
      state.status = MessageListStatus.LOADING
      state.error = null
    })
    builder.addCase(
      fetchMessages.fulfilled,
      (state, action: PayloadAction<ListMessagesResponse>) => {
        state.status = MessageListStatus.SUCCEEDED
        state.data = action.payload.data
        state.links = action.payload.links
        state.meta = action.payload.meta
      }
    )
    builder.addCase(fetchMessages.rejected, (state, action: PayloadAction<any>) => {
      state.status = MessageListStatus.FAILED
      state.error = action.payload || 'Fetch messages failed'
    })
  },
})

export default messagesListSlice.reducer
