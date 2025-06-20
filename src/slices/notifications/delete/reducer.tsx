// file: src/slices/notifications/delete/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteNotification } from './thunk'
import { NotificationsDeleteState } from '../../../types/notifications/delete'
import { NotificationListStatus } from '../../../enums/notifications/list'

const initialState: NotificationsDeleteState = {
    data: null,
    status: NotificationListStatus.IDLE,
    error: null,
}

const notificationsDeleteSlice = createSlice({
    name: 'notificationsDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteNotification.pending, (state) => {
                state.status = NotificationListStatus.LOADING
                state.error = null
            })
            .addCase(deleteNotification.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = NotificationListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(deleteNotification.rejected, (state, action: PayloadAction<any>) => {
                state.status = NotificationListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default notificationsDeleteSlice.reducer
