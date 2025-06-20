// file: src/slices/notificationusers/add/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addNotificationUser } from './thunk'
import { NotificationUsersAddState } from '../../../types/notificationusers/add'
import { NotificationUserListStatus } from '../../../enums/notificationusers/list'
import { NotificationUsersData } from '../../../types/notificationusers/list'

const initialState: NotificationUsersAddState = {
    data: null,
    status: NotificationUserListStatus.IDLE,
    error: null,
}

const notificationUsersAddSlice = createSlice({
    name: 'notificationUsersAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNotificationUser.pending, (state) => {
                state.status = NotificationUserListStatus.LOADING
                state.error = null
            })
            .addCase(addNotificationUser.fulfilled, (state, action: PayloadAction<NotificationUsersData>) => {
                state.status = NotificationUserListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(addNotificationUser.rejected, (state, action: PayloadAction<any>) => {
                state.status = NotificationUserListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default notificationUsersAddSlice.reducer
