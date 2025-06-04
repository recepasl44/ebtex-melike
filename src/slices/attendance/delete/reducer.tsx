import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteAttendance } from './thunk'
import { AttendancesDeleteState } from '../../../types/attendance/delete'
import AttendanceListStatus from '../../../enums/attendance/list'

const initialState: AttendancesDeleteState = {
    data: null,
    status: AttendanceListStatus.IDLE,
    error: null,
}

const attendanceDeleteSlice = createSlice({
    name: 'attendanceDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteAttendance.pending, (state) => {
                state.status = AttendanceListStatus.LOADING
                state.error = null
            })
            .addCase(deleteAttendance.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AttendanceListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(deleteAttendance.rejected, (state, action: PayloadAction<any>) => {
                state.status = AttendanceListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default attendanceDeleteSlice.reducer
