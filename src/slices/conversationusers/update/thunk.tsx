// file: src/slices/conversationusers/update/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { CONVERSATIONUSERS } from '../../../helpers/url_helper'
import { ConversationUsersUpdatePayload } from '../../../types/conversationusers/update'
import { ConversationUsersData } from '../../../types/conversationusers/list'

export const updateConversationUser = createAsyncThunk<ConversationUsersData, ConversationUsersUpdatePayload>(
    'conversationusers/updateConversationUser',
    async ({ conversationUserId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${CONVERSATIONUSERS}/${conversationUserId}`, payload)
            return resp.data.data as ConversationUsersData
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update conversation user failed')
        }
    }
)
