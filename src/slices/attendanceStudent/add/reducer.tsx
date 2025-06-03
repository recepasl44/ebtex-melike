import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addAttendanceStudent } from './thunk'
import { AttendanceStudentsAddState } from '../../../types/attendanceStudent/add'
import AttendanceStudentListStatus from '../../../enums/attendanceStudent/list'

const initialState: AttendanceStudentsAddState = {
    data: null,
    status: AttendanceStudentListStatus.IDLE,
    error: null,
}

const attendanceStudentAddSlice = createSlice({
    name: 'attendanceStudentAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAttendanceStudent.pending, (state) => {
                state.status = AttendanceStudentListStatus.LOADING
                state.error = null
            })
            .addCase(addAttendanceStudent.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AttendanceStudentListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(addAttendanceStudent.rejected, (state, action: PayloadAction<any>) => {
                state.status = AttendanceStudentListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default attendanceStudentAddSlice.reducer
