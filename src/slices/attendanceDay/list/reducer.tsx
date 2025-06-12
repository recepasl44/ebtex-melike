import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAttendanceDays } from './thunk'
import { ListAttendanceDaysResponse } from '../../../types/attendanceDay/list'
import AttendanceDayListStatus from '../../../enums/attendanceDay/list'

export interface AttendanceDayListState {
    data: ListAttendanceDaysResponse['data'] | null
    links: ListAttendanceDaysResponse['links'] | null
    meta: ListAttendanceDaysResponse['meta'] | null
    status: AttendanceDayListStatus
    error: string | null
}

const initialState: AttendanceDayListState = {
    data: null,
    links: null,
    meta: null,
    status: AttendanceDayListStatus.IDLE,
    error: null,
}

const attendanceDayListSlice = createSlice({
    name: 'attendanceDay/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAttendanceDays.pending, (state) => {
            state.status = AttendanceDayListStatus.LOADING
            state.error = null
        })
        builder.addCase(fetchAttendanceDays.fulfilled, (state, action: PayloadAction<ListAttendanceDaysResponse>) => {
            state.status = AttendanceDayListStatus.SUCCEEDED
            state.data = action.payload.data
            state.links = action.payload.links
            state.meta = action.payload.meta
        })
        builder.addCase(fetchAttendanceDays.rejected, (state, action: PayloadAction<any>) => {
            state.status = AttendanceDayListStatus.FAILED
            state.error = action.payload || 'Fetch attendance days failed'
        })
    },
})

export default attendanceDayListSlice.reducer
