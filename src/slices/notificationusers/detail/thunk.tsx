// file: src/slices/notificationusers/detail/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { NOTIFICATIONUSERS } from '../../../helpers/url_helper'
import { NotificationUsersData } from '../../../types/notificationusers/list'

export const fetchNotificationUser = createAsyncThunk<NotificationUsersData, number>(
    'notificationusers/fetchNotificationUser',
    async (notificationUserId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.get(`${NOTIFICATIONUSERS}/${notificationUserId}`)
            return resp.data.data as NotificationUsersData
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch notification user failed')
        }
    }
)
