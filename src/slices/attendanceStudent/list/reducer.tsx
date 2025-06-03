import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAttendanceStudents } from './thunk'
import { ListAttendanceStudentsResponse } from '../../../types/attendanceStudent/list'
import AttendanceStudentListStatus from '../../../enums/attendanceStudent/list'

export interface AttendanceStudentListState {
    data: ListAttendanceStudentsResponse['data'] | null
    links: ListAttendanceStudentsResponse['links'] | null
    meta: ListAttendanceStudentsResponse['meta'] | null
    status: AttendanceStudentListStatus
    error: string | null
}

const initialState: AttendanceStudentListState = {
    data: null,
    links: null,
    meta: null,
    status: AttendanceStudentListStatus.IDLE,
    error: null,
}

const attendanceStudentListSlice = createSlice({
    name: 'attendanceStudent/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAttendanceStudents.pending, (state) => {
            state.status = AttendanceStudentListStatus.LOADING
            state.error = null
        })
        builder.addCase(
            fetchAttendanceStudents.fulfilled,
            (state, action: PayloadAction<ListAttendanceStudentsResponse>) => {
                state.status = AttendanceStudentListStatus.SUCCEEDED
                state.data = action.payload.data
                state.links = action.payload.links
                state.meta = action.payload.meta
            }
        )
        builder.addCase(fetchAttendanceStudents.rejected, (state, action: PayloadAction<any>) => {
            state.status = AttendanceStudentListStatus.FAILED
            state.error = action.payload || 'Fetch attendance students failed'
        })
    },
})

export default attendanceStudentListSlice.reducer
