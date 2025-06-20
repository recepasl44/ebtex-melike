// file: src/slices/notificationusers/update/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { updateNotificationUser } from './thunk'
import { NotificationUsersUpdateState } from '../../../types/notificationusers/update'
import { NotificationUserListStatus } from '../../../enums/notificationusers/list'
import { NotificationUsersData } from '../../../types/notificationusers/list'

const initialState: NotificationUsersUpdateState = {
    data: null,
    status: NotificationUserListStatus.IDLE,
    error: null,
}

const notificationUsersUpdateSlice = createSlice({
    name: 'notificationUsersUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateNotificationUser.pending, (state) => {
                state.status = NotificationUserListStatus.LOADING
                state.error = null
            })
            .addCase(updateNotificationUser.fulfilled, (state, action: PayloadAction<NotificationUsersData>) => {
                state.status = NotificationUserListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(updateNotificationUser.rejected, (state, action: PayloadAction<any>) => {
                state.status = NotificationUserListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default notificationUsersUpdateSlice.reducer
