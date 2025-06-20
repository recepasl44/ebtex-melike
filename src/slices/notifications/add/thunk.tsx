// file: src/slices/notifications/add/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { NOTIFICATIONS } from '../../../helpers/url_helper'
import { NotificationsAddPayload } from '../../../types/notifications/add'
import { NotificationData } from '../../../types/notifications/list'

export const addNotification = createAsyncThunk<NotificationData, NotificationsAddPayload>(
    'notifications/addNotification',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(NOTIFICATIONS, payload)
            return resp.data.data as NotificationData
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add notification failed')
        }
    }
)
