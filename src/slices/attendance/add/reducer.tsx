import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addAttendance } from './thunk'
import { AttendancesAddState } from '../../../types/attendance/add'
import AttendanceListStatus from '../../../enums/attendance/list'

const initialState: AttendancesAddState = {
    data: null,
    status: AttendanceListStatus.IDLE,
    error: null,
}

const attendanceAddSlice = createSlice({
    name: 'attendanceAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAttendance.pending, (state) => {
                state.status = AttendanceListStatus.LOADING
                state.error = null
            })
            .addCase(addAttendance.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AttendanceListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(addAttendance.rejected, (state, action: PayloadAction<any>) => {
                state.status = AttendanceListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default attendanceAddSlice.reducer
