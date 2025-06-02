import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ATTENDANCESTUDENTS } from '../../../helpers/url_helper'
import { AttendanceStudentsDeleteState } from '../../../types/attendanceStudent/delete'

export const deleteAttendanceStudent = createAsyncThunk<AttendanceStudentsDeleteState, number>(
    'attendanceStudent/deleteAttendanceStudent',
    async (attendanceStudentId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${ATTENDANCESTUDENTS}/${attendanceStudentId}`)
            return resp.data as AttendanceStudentsDeleteState
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete attendance student failed')
        }
    }
)
