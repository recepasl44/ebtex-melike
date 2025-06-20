// file: src/slices/notifications/update/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { NOTIFICATIONS } from '../../../helpers/url_helper'
import { NotificationsUpdatePayload } from '../../../types/notifications/update'
import { NotificationData } from '../../../types/notifications/list'

export const updateNotification = createAsyncThunk<NotificationData, NotificationsUpdatePayload>(
    'notifications/updateNotification',
    async ({ notificationId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${NOTIFICATIONS}/${notificationId}`, payload)
            return resp.data.data as NotificationData
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update notification failed')
        }
    }
)
