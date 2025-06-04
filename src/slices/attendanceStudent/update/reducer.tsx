import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AttendanceStudentsUpdateState } from '../../../types/attendanceStudent/update'
import AttendanceStudentListStatus from '../../../enums/attendanceStudent/list'
import { updateAttendanceStudent } from './thunk'

const initialState: AttendanceStudentsUpdateState = {
    data: null,
    status: AttendanceStudentListStatus.IDLE,
    error: null,
}

const attendanceStudentUpdateSlice = createSlice({
    name: 'attendanceStudentUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateAttendanceStudent.pending, (state) => {
                state.status = AttendanceStudentListStatus.LOADING
                state.error = null
            })
            .addCase(updateAttendanceStudent.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AttendanceStudentListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(updateAttendanceStudent.rejected, (state, action: PayloadAction<any>) => {
                state.status = AttendanceStudentListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default attendanceStudentUpdateSlice.reducer
