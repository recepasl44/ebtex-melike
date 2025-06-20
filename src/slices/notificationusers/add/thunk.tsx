// file: src/slices/notificationusers/add/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { NOTIFICATIONUSERS } from '../../../helpers/url_helper'
import { NotificationUsersAddPayload } from '../../../types/notificationusers/add'
import { NotificationUsersData } from '../../../types/notificationusers/list'

export const addNotificationUser = createAsyncThunk<NotificationUsersData, NotificationUsersAddPayload>(
    'notificationusers/addNotificationUser',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(NOTIFICATIONUSERS, payload)
            return resp.data.data as NotificationUsersData
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add notification user failed')
        }
    }
)
