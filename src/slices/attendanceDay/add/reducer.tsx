import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addAttendanceDay } from './thunk'
import { AttendanceDaysAddState } from '../../../types/attendanceDay/add'
import AttendanceDayListStatus from '../../../enums/attendanceDay/list'

const initialState: AttendanceDaysAddState = {
    data: null,
    status: AttendanceDayListStatus.IDLE,
    error: null,
}

const attendanceDayAddSlice = createSlice({
    name: 'attendanceDayAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAttendanceDay.pending, (state) => {
                state.status = AttendanceDayListStatus.LOADING
                state.error = null
            })
            .addCase(addAttendanceDay.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AttendanceDayListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(addAttendanceDay.rejected, (state, action: PayloadAction<any>) => {
                state.status = AttendanceDayListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default attendanceDayAddSlice.reducer
