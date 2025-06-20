// file: src/slices/conversationusers/detail/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { CONVERSATIONUSERS } from '../../../helpers/url_helper'
import { ConversationUsersData } from '../../../types/conversationusers/list'

export const fetchConversationUser = createAsyncThunk<ConversationUsersData, number>(
    'conversationusers/fetchConversationUser',
    async (conversationUserId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.get(`${CONVERSATIONUSERS}/${conversationUserId}`)
            return resp.data.data as ConversationUsersData
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch conversation user failed')
        }
    }
)
