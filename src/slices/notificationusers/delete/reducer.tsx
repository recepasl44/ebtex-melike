// file: src/slices/notificationusers/delete/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteNotificationUser } from './thunk'
import { NotificationUsersDeleteState } from '../../../types/notificationusers/delete'
import { NotificationUserListStatus } from '../../../enums/notificationusers/list'

const initialState: NotificationUsersDeleteState = {
    data: null,
    status: NotificationUserListStatus.IDLE,
    error: null,
}

const notificationUsersDeleteSlice = createSlice({
    name: 'notificationUsersDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteNotificationUser.pending, (state) => {
                state.status = NotificationUserListStatus.LOADING
                state.error = null
            })
            .addCase(deleteNotificationUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = NotificationUserListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(deleteNotificationUser.rejected, (state, action: PayloadAction<any>) => {
                state.status = NotificationUserListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default notificationUsersDeleteSlice.reducer
