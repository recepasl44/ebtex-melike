import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AttendanceDaysUpdateState } from '../../../types/attendanceDay/update'
import AttendanceDayListStatus from '../../../enums/attendanceDay/list'
import { updateAttendanceDay } from './thunk'

const initialState: AttendanceDaysUpdateState = {
    data: null,
    status: AttendanceDayListStatus.IDLE,
    error: null,
}

const attendanceDayUpdateSlice = createSlice({
    name: 'attendanceDayUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateAttendanceDay.pending, (state) => {
                state.status = AttendanceDayListStatus.LOADING
                state.error = null
            })
            .addCase(updateAttendanceDay.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AttendanceDayListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(updateAttendanceDay.rejected, (state, action: PayloadAction<any>) => {
                state.status = AttendanceDayListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default attendanceDayUpdateSlice.reducer
