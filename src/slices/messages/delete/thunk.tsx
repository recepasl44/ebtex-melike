// file: src/slices/messages/delete/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { MESSAGES } from '../../../helpers/url_helper'
import { MessagesDeleteState } from '../../../types/messages/delete'

export const deleteMessage = createAsyncThunk<MessagesDeleteState, number>(
    'messages/deleteMessage',
    async (messageId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${MESSAGES}/${messageId}`)
            return resp.data as MessagesDeleteState
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete message failed')
        }
    }
)
