// file: src/slices/notifications/detail/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchNotification } from './thunk'
import { NotificationsDetailState } from '../../../types/notifications/detail'
import { NotificationListStatus } from '../../../enums/notifications/list'
import { NotificationData } from '../../../types/notifications/list'

const initialState: NotificationsDetailState = {
    data: null,
    status: NotificationListStatus.IDLE,
    error: null,
}

const notificationsDetailSlice = createSlice({
    name: 'notificationsDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotification.pending, (state) => {
                state.status = NotificationListStatus.LOADING
                state.error = null
            })
            .addCase(fetchNotification.fulfilled, (state, action: PayloadAction<NotificationData>) => {
                state.status = NotificationListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(fetchNotification.rejected, (state, action: PayloadAction<any>) => {
                state.status = NotificationListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default notificationsDetailSlice.reducer
