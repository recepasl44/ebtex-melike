import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAttendance } from './thunk'
import { AttendanceDetailState } from '../../../types/attendance/detail'
import AttendanceListStatus from '../../../enums/attendance/list'

const initialState: AttendanceDetailState = {
    data: null,
    status: AttendanceListStatus.IDLE,
    error: null,
}

const attendanceDetailSlice = createSlice({
    name: 'attendanceDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAttendance.pending, (state) => {
                state.status = AttendanceListStatus.LOADING
                state.error = null
            })
            .addCase(fetchAttendance.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AttendanceListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(fetchAttendance.rejected, (state, action: PayloadAction<any>) => {
                state.status = AttendanceListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default attendanceDetailSlice.reducer
