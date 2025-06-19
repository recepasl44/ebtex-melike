import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteAttendanceDay } from './thunk'
import { AttendanceDaysDeleteState } from '../../../types/attendanceDay/delete'
import AttendanceDayListStatus from '../../../enums/attendanceDay/list'

const initialState: AttendanceDaysDeleteState = {
    data: null,
    status: AttendanceDayListStatus.IDLE,
    error: null,
}

const attendanceDayDeleteSlice = createSlice({
    name: 'attendanceDayDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteAttendanceDay.pending, (state) => {
                state.status = AttendanceDayListStatus.LOADING
                state.error = null
            })
            .addCase(deleteAttendanceDay.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AttendanceDayListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(deleteAttendanceDay.rejected, (state, action: PayloadAction<any>) => {
                state.status = AttendanceDayListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default attendanceDayDeleteSlice.reducer
