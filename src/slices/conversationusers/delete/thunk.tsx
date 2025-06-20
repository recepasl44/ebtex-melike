// file: src/slices/conversationusers/delete/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { CONVERSATIONUSERS } from '../../../helpers/url_helper'
import { ConversationUsersDeleteState } from '../../../types/conversationusers/delete'

export const deleteConversationUser = createAsyncThunk<ConversationUsersDeleteState, number>(
    'conversationusers/deleteConversationUser',
    async (conversationUserId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${CONVERSATIONUSERS}/${conversationUserId}`)
            return resp.data as ConversationUsersDeleteState
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete conversation user failed')
        }
    }
)
