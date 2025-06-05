import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addAttendanceTeacher } from './thunk'
import { AttendanceTeachersAddState } from '../../../types/attendanceTeacher/add'
import AttendanceTeacherListStatus from '../../../enums/attendanceTeacher/list'

const initialState: AttendanceTeachersAddState = {
    data: null,
    status: AttendanceTeacherListStatus.IDLE,
    error: null,
}

const attendanceTeacherAddSlice = createSlice({
    name: 'attendanceTeacherAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAttendanceTeacher.pending, (state) => {
                state.status = AttendanceTeacherListStatus.LOADING
                state.error = null
            })
            .addCase(addAttendanceTeacher.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AttendanceTeacherListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(addAttendanceTeacher.rejected, (state, action: PayloadAction<any>) => {
                state.status = AttendanceTeacherListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default attendanceTeacherAddSlice.reducer
