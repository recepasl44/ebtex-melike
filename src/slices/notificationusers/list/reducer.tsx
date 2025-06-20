// file: src/slices/notificationusers/list/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchNotificationUsers } from './thunk'
import { ListNotificationUsersResponse } from '../../../types/notificationusers/list'
import { NotificationUserListStatus } from '../../../enums/notificationusers/list'

export interface NotificationUsersListState {
    data: ListNotificationUsersResponse['data'] | null
    links: ListNotificationUsersResponse['links'] | null
    meta: ListNotificationUsersResponse['meta'] | null
    status: NotificationUserListStatus
    error: string | null
}

const initialState: NotificationUsersListState = {
    data: null,
    links: null,
    meta: null,
    status: NotificationUserListStatus.IDLE,
    error: null,
}

const notificationUsersListSlice = createSlice({
    name: 'notificationusers/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNotificationUsers.pending, (state) => {
            state.status = NotificationUserListStatus.LOADING
            state.error = null
        })
        builder.addCase(fetchNotificationUsers.fulfilled, (state, action: PayloadAction<ListNotificationUsersResponse>) => {
            state.status = NotificationUserListStatus.SUCCEEDED
            state.data = action.payload.data
            state.links = action.payload.links
            state.meta = action.payload.meta
        })
        builder.addCase(fetchNotificationUsers.rejected, (state, action: PayloadAction<any>) => {
            state.status = NotificationUserListStatus.FAILED
            state.error = action.payload || 'Fetch notification users failed'
        })
    },
})

export default notificationUsersListSlice.reducer
