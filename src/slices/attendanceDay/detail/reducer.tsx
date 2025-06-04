import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAttendanceDay } from './thunk'
import { AttendanceDayDetailState } from '../../../types/attendanceDay/detail'
import AttendanceDayListStatus from '../../../enums/attendanceDay/list'

const initialState: AttendanceDayDetailState = {
    data: null,
    status: AttendanceDayListStatus.IDLE,
    error: null,
}

const attendanceDayDetailSlice = createSlice({
    name: 'attendanceDayDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAttendanceDay.pending, (state) => {
                state.status = AttendanceDayListStatus.LOADING
                state.error = null
            })
            .addCase(fetchAttendanceDay.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AttendanceDayListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(fetchAttendanceDay.rejected, (state, action: PayloadAction<any>) => {
                state.status = AttendanceDayListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default attendanceDayDetailSlice.reducer
