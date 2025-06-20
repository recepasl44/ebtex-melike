// file: src/slices/messages/list/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { MESSAGES } from '../../../helpers/url_helper'
import { ListMessagesResponse, ListMessageArg } from '../../../types/messages/list'

export const fetchMessages = createAsyncThunk<ListMessagesResponse, ListMessageArg>(
    'messages/fetchMessages',
    async (queryParams, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams()
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'enabled') {
                    query.append(key, String(value))
                }
            })
            const url = `${MESSAGES}?${query.toString()}`
            const resp = await axiosInstance.get(url)
            return resp.data as ListMessagesResponse
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch messages failed')
        }
    }
)
