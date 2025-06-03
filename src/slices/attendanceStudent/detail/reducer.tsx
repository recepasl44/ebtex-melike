import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAttendanceStudent } from './thunk'
import { AttendanceStudentDetailState } from '../../../types/attendanceStudent/detail'
import AttendanceStudentListStatus from '../../../enums/attendanceStudent/list'

const initialState: AttendanceStudentDetailState = {
    data: null,
    status: AttendanceStudentListStatus.IDLE,
    error: null,
}

const attendanceStudentDetailSlice = createSlice({
    name: 'attendanceStudentDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAttendanceStudent.pending, (state) => {
                state.status = AttendanceStudentListStatus.LOADING
                state.error = null
            })
            .addCase(fetchAttendanceStudent.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AttendanceStudentListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(fetchAttendanceStudent.rejected, (state, action: PayloadAction<any>) => {
                state.status = AttendanceStudentListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default attendanceStudentDetailSlice.reducer
