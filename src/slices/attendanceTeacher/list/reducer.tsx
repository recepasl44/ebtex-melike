import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAttendanceTeachers } from './thunk'
import { ListAttendanceTeachersResponse } from '../../../types/attendanceTeacher/list'
import AttendanceTeacherListStatus from '../../../enums/attendanceTeacher/list'

export interface AttendanceTeacherListState {
    data: ListAttendanceTeachersResponse['data'] | null
    links: ListAttendanceTeachersResponse['links'] | null
    meta: ListAttendanceTeachersResponse['meta'] | null
    status: AttendanceTeacherListStatus
    error: string | null
}

const initialState: AttendanceTeacherListState = {
    data: null,
    links: null,
    meta: null,
    status: AttendanceTeacherListStatus.IDLE,
    error: null,
}

const attendanceTeacherListSlice = createSlice({
    name: 'attendanceTeacher/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAttendanceTeachers.pending, (state) => {
            state.status = AttendanceTeacherListStatus.LOADING
            state.error = null
        })
        builder.addCase(
            fetchAttendanceTeachers.fulfilled,
            (state, action: PayloadAction<ListAttendanceTeachersResponse>) => {
                state.status = AttendanceTeacherListStatus.SUCCEEDED
                state.data = action.payload.data
                state.links = action.payload.links
                state.meta = action.payload.meta
            }
        )
        builder.addCase(fetchAttendanceTeachers.rejected, (state, action: PayloadAction<any>) => {
            state.status = AttendanceTeacherListStatus.FAILED
            state.error = action.payload || 'Fetch attendance teachers failed'
        })
    },
})

export default attendanceTeacherListSlice.reducer
