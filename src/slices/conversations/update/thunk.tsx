// file: src/slices/conversations/update/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { CONVERSATIONS } from '../../../helpers/url_helper'
import { ConversationsUpdatePayload } from '../../../types/conversations/update'
import { ConversationData } from '../../../types/conversations/list'

export const updateConversation = createAsyncThunk<ConversationData, ConversationsUpdatePayload>(
    'conversations/updateConversation',
    async ({ conversationId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${CONVERSATIONS}/${conversationId}`, payload)
            return resp.data.data as ConversationData
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update conversation failed')
        }
    }
)
