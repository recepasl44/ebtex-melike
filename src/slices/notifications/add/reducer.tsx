// file: src/slices/notifications/add/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addNotification } from './thunk'
import { NotificationsAddState } from '../../../types/notifications/add'
import { NotificationListStatus } from '../../../enums/notifications/list'
import { NotificationData } from '../../../types/notifications/list'

const initialState: NotificationsAddState = {
    data: null,
    status: NotificationListStatus.IDLE,
    error: null,
}

const notificationsAddSlice = createSlice({
    name: 'notificationsAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNotification.pending, (state) => {
                state.status = NotificationListStatus.LOADING
                state.error = null
            })
            .addCase(addNotification.fulfilled, (state, action: PayloadAction<NotificationData>) => {
                state.status = NotificationListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(addNotification.rejected, (state, action: PayloadAction<any>) => {
                state.status = NotificationListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default notificationsAddSlice.reducer
