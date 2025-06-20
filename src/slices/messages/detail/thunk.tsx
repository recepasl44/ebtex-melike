// file: src/slices/messages/detail/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { MESSAGES } from '../../../helpers/url_helper'
import { MessageData } from '../../../types/messages/list'

export const fetchMessage = createAsyncThunk<MessageData, number>(
    'messages/fetchMessage',
    async (messageId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.get(`${MESSAGES}/${messageId}`)
            return resp.data.data as MessageData
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch message failed')
        }
    }
)
