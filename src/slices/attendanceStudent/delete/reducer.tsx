import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteAttendanceStudent } from './thunk'
import { AttendanceStudentsDeleteState } from '../../../types/attendanceStudent/delete'
import AttendanceStudentListStatus from '../../../enums/attendanceStudent/list'

const initialState: AttendanceStudentsDeleteState = {
    data: null,
    status: AttendanceStudentListStatus.IDLE,
    error: null,
}

const attendanceStudentDeleteSlice = createSlice({
    name: 'attendanceStudentDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteAttendanceStudent.pending, (state) => {
                state.status = AttendanceStudentListStatus.LOADING
                state.error = null
            })
            .addCase(deleteAttendanceStudent.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AttendanceStudentListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(deleteAttendanceStudent.rejected, (state, action: PayloadAction<any>) => {
                state.status = AttendanceStudentListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default attendanceStudentDeleteSlice.reducer
