// file: src/slices/notificationusers/update/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { NOTIFICATIONUSERS } from '../../../helpers/url_helper'
import { NotificationUsersUpdatePayload } from '../../../types/notificationusers/update'
import { NotificationUsersData } from '../../../types/notificationusers/list'

export const updateNotificationUser = createAsyncThunk<NotificationUsersData, NotificationUsersUpdatePayload>(
    'notificationusers/updateNotificationUser',
    async ({ notificationUserId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${NOTIFICATIONUSERS}/${notificationUserId}`, payload)
            return resp.data.data as NotificationUsersData
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update notification user failed')
        }
    }
)
