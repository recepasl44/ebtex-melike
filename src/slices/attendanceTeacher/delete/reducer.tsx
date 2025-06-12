import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteAttendanceTeacher } from './thunk'
import { AttendanceTeachersDeleteState } from '../../../types/attendanceTeacher/delete'
import AttendanceTeacherListStatus from '../../../enums/attendanceTeacher/list'

const initialState: AttendanceTeachersDeleteState = {
    data: null,
    status: AttendanceTeacherListStatus.IDLE,
    error: null,
}

const attendanceTeacherDeleteSlice = createSlice({
    name: 'attendanceTeacherDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteAttendanceTeacher.pending, (state) => {
                state.status = AttendanceTeacherListStatus.LOADING
                state.error = null
            })
            .addCase(deleteAttendanceTeacher.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AttendanceTeacherListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(deleteAttendanceTeacher.rejected, (state, action: PayloadAction<any>) => {
                state.status = AttendanceTeacherListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default attendanceTeacherDeleteSlice.reducer
