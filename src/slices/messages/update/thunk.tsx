// file: src\slices\messages\update\thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { MESSAGES } from '../../../helpers/url_helper'
import { MessagesUpdatePayload } from '../../../types/messages/update'
import { MessageData } from '../../../types/messages/list'

export const updateMessage = createAsyncThunk<MessageData, MessagesUpdatePayload>(
  'messages/updateMessage',
  async ({ messageId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${MESSAGES}/${messageId}`, payload)
      return resp.data.data as MessageData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update message failed')
    }
  }
)
