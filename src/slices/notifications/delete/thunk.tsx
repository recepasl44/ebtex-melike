// file: src/slices/notifications/delete/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { NOTIFICATIONS } from '../../../helpers/url_helper'
import { NotificationsDeleteState } from '../../../types/notifications/delete'

export const deleteNotification = createAsyncThunk<NotificationsDeleteState, number>(
    'notifications/deleteNotification',
    async (notificationId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${NOTIFICATIONS}/${notificationId}`)
            return resp.data as NotificationsDeleteState
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete notification failed')
        }
    }
)
