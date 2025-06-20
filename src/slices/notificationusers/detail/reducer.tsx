// file: src/slices/notificationusers/detail/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchNotificationUser } from './thunk'
import { NotificationUsersDetailState } from '../../../types/notificationusers/detail'
import { NotificationUserListStatus } from '../../../enums/notificationusers/list'
import { NotificationUsersData } from '../../../types/notificationusers/list'

const initialState: NotificationUsersDetailState = {
    data: null,
    status: NotificationUserListStatus.IDLE,
    error: null,
}

const notificationUsersDetailSlice = createSlice({
    name: 'notificationUsersDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotificationUser.pending, (state) => {
                state.status = NotificationUserListStatus.LOADING
                state.error = null
            })
            .addCase(fetchNotificationUser.fulfilled, (state, action: PayloadAction<NotificationUsersData>) => {
                state.status = NotificationUserListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(fetchNotificationUser.rejected, (state, action: PayloadAction<any>) => {
                state.status = NotificationUserListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default notificationUsersDetailSlice.reducer
