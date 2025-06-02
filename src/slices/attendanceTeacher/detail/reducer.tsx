import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAttendanceTeacher } from './thunk'
import { AttendanceTeacherDetailState } from '../../../types/attendanceTeacher/detail'
import AttendanceTeacherListStatus from '../../../enums/attendanceTeacher/list'

const initialState: AttendanceTeacherDetailState = {
    data: null,
    status: AttendanceTeacherListStatus.IDLE,
    error: null,
}

const attendanceTeacherDetailSlice = createSlice({
    name: 'attendanceTeacherDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAttendanceTeacher.pending, (state) => {
                state.status = AttendanceTeacherListStatus.LOADING
                state.error = null
            })
            .addCase(fetchAttendanceTeacher.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AttendanceTeacherListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(fetchAttendanceTeacher.rejected, (state, action: PayloadAction<any>) => {
                state.status = AttendanceTeacherListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default attendanceTeacherDetailSlice.reducer
