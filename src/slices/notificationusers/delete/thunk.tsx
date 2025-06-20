// file: src/slices/notificationusers/delete/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { NOTIFICATIONUSERS } from '../../../helpers/url_helper'
import { NotificationUsersDeleteState } from '../../../types/notificationusers/delete'

export const deleteNotificationUser = createAsyncThunk<NotificationUsersDeleteState, number>(
    'notificationusers/deleteNotificationUser',
    async (notificationUserId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${NOTIFICATIONUSERS}/${notificationUserId}`)
            return resp.data as NotificationUsersDeleteState
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete notification user failed')
        }
    }
)
