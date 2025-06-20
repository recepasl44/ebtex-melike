// file: src/slices/notifications/list/thunk.tsx
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { NOTIFICATIONS } from '../../../helpers/url_helper'
import { ListNotificationsResponse, ListNotificationArg } from '../../../types/notifications/list'

export const fetchNotifications = createAsyncThunk<ListNotificationsResponse, ListNotificationArg>(
    'notifications/fetchNotifications',
    async (queryParams, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams()
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'enabled') {
                    query.append(key, String(value))
                }
            })
            const url = `${NOTIFICATIONS}?${query.toString()}`
            const resp = await axiosInstance.get(url)
            return resp.data as ListNotificationsResponse
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch notifications failed')
        }
    }
)
