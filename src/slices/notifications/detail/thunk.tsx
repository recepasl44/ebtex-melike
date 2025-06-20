// file: src/slices/notifications/detail/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { NOTIFICATIONS } from '../../../helpers/url_helper'
import { NotificationData } from '../../../types/notifications/list'

export const fetchNotification = createAsyncThunk<NotificationData, number>(
    'notifications/fetchNotification',
    async (notificationId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.get(`${NOTIFICATIONS}/${notificationId}`)
            return resp.data.data as NotificationData
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch notification failed')
        }
    }
)
