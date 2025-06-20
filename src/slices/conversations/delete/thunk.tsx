// file: src/slices/conversations/delete/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { CONVERSATIONS } from '../../../helpers/url_helper'
import { ConversationsDeleteState } from '../../../types/conversations/delete'

export const deleteConversation = createAsyncThunk<ConversationsDeleteState, number>(
    'conversations/deleteConversation',
    async (conversationId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${CONVERSATIONS}/${conversationId}`)
            return resp.data as ConversationsDeleteState
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete conversation failed')
        }
    }
)
