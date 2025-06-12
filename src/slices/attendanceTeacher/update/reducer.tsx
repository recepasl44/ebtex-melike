import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AttendanceTeachersUpdateState } from '../../../types/attendanceTeacher/update'
import AttendanceTeacherListStatus from '../../../enums/attendanceTeacher/list'
import { updateAttendanceTeacher } from './thunk'

const initialState: AttendanceTeachersUpdateState = {
    data: null,
    status: AttendanceTeacherListStatus.IDLE,
    error: null,
}

const attendanceTeacherUpdateSlice = createSlice({
    name: 'attendanceTeacherUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateAttendanceTeacher.pending, (state) => {
                state.status = AttendanceTeacherListStatus.LOADING
                state.error = null
            })
            .addCase(updateAttendanceTeacher.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AttendanceTeacherListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(updateAttendanceTeacher.rejected, (state, action: PayloadAction<any>) => {
                state.status = AttendanceTeacherListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default attendanceTeacherUpdateSlice.reducer
