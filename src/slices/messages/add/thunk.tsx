// file: src\slices\messages\add\thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { MESSAGES } from '../../../helpers/url_helper'
import { MessagesAddPayload } from '../../../types/messages/add'
import { MessageData } from '../../../types/messages/list'

export const addMessage = createAsyncThunk<MessageData, MessagesAddPayload>(
  'messages/addMessage',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(MESSAGES, payload)
      return resp.data.data as MessageData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add message failed')
    }
  }
)
