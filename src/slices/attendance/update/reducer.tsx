import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AttendancesUpdateState } from '../../../types/attendance/update'
import { updateAttendance } from './thunk'
import AttendanceListStatus from '../../../enums/attendance/list'

const initialState: AttendancesUpdateState = {
    data: null,
    status: AttendanceListStatus.IDLE,
    error: null,
}

const attendanceUpdateSlice = createSlice({
    name: 'attendanceUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateAttendance.pending, (state) => {
                state.status = AttendanceListStatus.LOADING
                state.error = null
            })
            .addCase(updateAttendance.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AttendanceListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(updateAttendance.rejected, (state, action: PayloadAction<any>) => {
                state.status = AttendanceListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default attendanceUpdateSlice.reducer
