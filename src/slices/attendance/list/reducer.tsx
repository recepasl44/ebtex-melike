import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAttendances } from './thunk'
import { ListAttendancesResponse } from '../../../types/attendance/list'
import AttendanceListStatus from '../../../enums/attendance/list'

export interface AttendanceListState {
    data: ListAttendancesResponse['data'] | null
    links: ListAttendancesResponse['links'] | null
    meta: ListAttendancesResponse['meta'] | null
    status: AttendanceListStatus
    error: string | null
}

const initialState: AttendanceListState = {
    data: null,
    links: null,
    meta: null,
    status: AttendanceListStatus.IDLE,
    error: null,
}

const attendanceListSlice = createSlice({
    name: 'attendance/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAttendances.pending, (state) => {
            state.status = AttendanceListStatus.LOADING
            state.error = null
        })
        builder.addCase(fetchAttendances.fulfilled, (state, action: PayloadAction<ListAttendancesResponse>) => {
            state.status = AttendanceListStatus.SUCCEEDED
            state.data = action.payload.data
            state.links = action.payload.links
            state.meta = action.payload.meta
        })
        builder.addCase(fetchAttendances.rejected, (state, action: PayloadAction<any>) => {
            state.status = AttendanceListStatus.FAILED
            state.error = action.payload || 'Fetch attendances failed'
        })
    },
})

export default attendanceListSlice.reducer
