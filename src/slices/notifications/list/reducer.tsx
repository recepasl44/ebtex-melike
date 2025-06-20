// file: src/slices/notifications/list/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchNotifications } from './thunk'
import { ListNotificationsResponse } from '../../../types/notifications/list'
import { NotificationListStatus } from '../../../enums/notifications/list'

export interface NotificationsListState {
    data: ListNotificationsResponse['data'] | null
    links: ListNotificationsResponse['links'] | null
    meta: ListNotificationsResponse['meta'] | null
    status: NotificationListStatus
    error: string | null
}

const initialState: NotificationsListState = {
    data: null,
    links: null,
    meta: null,
    status: NotificationListStatus.IDLE,
    error: null,
}

const notificationsListSlice = createSlice({
    name: 'notifications/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.pending, (state) => {
            state.status = NotificationListStatus.LOADING
            state.error = null
        })
        builder.addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<ListNotificationsResponse>) => {
            state.status = NotificationListStatus.SUCCEEDED
            state.data = action.payload.data
            state.links = action.payload.links
            state.meta = action.payload.meta
        })
        builder.addCase(fetchNotifications.rejected, (state, action: PayloadAction<any>) => {
            state.status = NotificationListStatus.FAILED
            state.error = action.payload || 'Fetch notifications failed'
        })
    },
})

export default notificationsListSlice.reducer
