// file: src/slices/notifications/update/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { updateNotification } from './thunk'
import { NotificationsUpdateState } from '../../../types/notifications/update'
import { NotificationListStatus } from '../../../enums/notifications/list'
import { NotificationData } from '../../../types/notifications/list'

const initialState: NotificationsUpdateState = {
    data: null,
    status: NotificationListStatus.IDLE,
    error: null,
}

const notificationsUpdateSlice = createSlice({
    name: 'notificationsUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateNotification.pending, (state) => {
                state.status = NotificationListStatus.LOADING
                state.error = null
            })
            .addCase(updateNotification.fulfilled, (state, action: PayloadAction<NotificationData>) => {
                state.status = NotificationListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(updateNotification.rejected, (state, action: PayloadAction<any>) => {
                state.status = NotificationListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default notificationsUpdateSlice.reducer
