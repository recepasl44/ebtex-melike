// file: src/slices/notificationusers/list/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { NOTIFICATIONUSERS } from '../../../helpers/url_helper'
import { ListNotificationUsersResponse, ListNotificationUserArg } from '../../../types/notificationusers/list'

export const fetchNotificationUsers = createAsyncThunk<ListNotificationUsersResponse, ListNotificationUserArg>(
    'notificationusers/fetchNotificationUsers',
    async (queryParams, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams()
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'enabled') {
                    query.append(key, String(value))
                }
            })
            const url = `${NOTIFICATIONUSERS}?${query.toString()}`
            const resp = await axiosInstance.get(url)
            return resp.data as ListNotificationUsersResponse
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch notification users failed')
        }
    }
)
