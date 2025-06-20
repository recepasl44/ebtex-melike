// file: src/slices/conversations/detail/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { CONVERSATIONS } from '../../../helpers/url_helper'
import { ConversationData } from '../../../types/conversations/list'

export const fetchConversation = createAsyncThunk<ConversationData, number>(
    'conversations/fetchConversation',
    async (conversationId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.get(`${CONVERSATIONS}/${conversationId}`)
            return resp.data.data as ConversationData
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch conversation failed')
        }
    }
)
