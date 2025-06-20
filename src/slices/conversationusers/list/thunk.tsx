// file: src/slices/conversationusers/list/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { CONVERSATIONUSERS } from '../../../helpers/url_helper'
import { ListConversationUsersResponse, ListConversationUserArg } from '../../../types/conversationusers/list'

export const fetchConversationUsers = createAsyncThunk<ListConversationUsersResponse, ListConversationUserArg>(
    'conversationusers/fetchConversationUsers',
    async (queryParams, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams()
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'enabled') {
                    query.append(key, String(value))
                }
            })
            const url = `${CONVERSATIONUSERS}?${query.toString()}`
            const resp = await axiosInstance.get(url)
            return resp.data as ListConversationUsersResponse
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch conversation users failed')
        }
    }
)
