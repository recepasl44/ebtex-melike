// file: src/slices/conversationusers/add/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { CONVERSATIONUSERS } from '../../../helpers/url_helper'
import { ConversationUsersAddPayload } from '../../../types/conversationusers/add'
import { ConversationUsersData } from '../../../types/conversationusers/list'

export const addConversationUser = createAsyncThunk<ConversationUsersData, ConversationUsersAddPayload>(
    'conversationusers/addConversationUser',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(CONVERSATIONUSERS, payload)
            return resp.data.data as ConversationUsersData
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add conversation user failed')
        }
    }
)
