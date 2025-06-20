// file: src/slices/conversations/list/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { CONVERSATIONS } from '../../../helpers/url_helper'
import { ListConversationsResponse, ListConversationArg } from '../../../types/conversations/list'

export const fetchConversations = createAsyncThunk<ListConversationsResponse, ListConversationArg>(
    'conversations/fetchConversations',
    async (queryParams, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams()
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'enabled') {
                    query.append(key, String(value))
                }
            })
            const url = `${CONVERSATIONS}?${query.toString()}`
            const resp = await axiosInstance.get(url)
            return resp.data as ListConversationsResponse
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch conversations failed')
        }
    }
)
