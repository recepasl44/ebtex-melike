// file: src/slices/conversations/add/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { CONVERSATIONS } from '../../../helpers/url_helper'
import { ConversationsAddPayload } from '../../../types/conversations/add'
import { ConversationData } from '../../../types/conversations/list'

export const addConversation = createAsyncThunk<ConversationData, ConversationsAddPayload>(
    'conversations/addConversation',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(CONVERSATIONS, payload)
            return resp.data.data as ConversationData
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add conversation failed')
        }
    }
)
