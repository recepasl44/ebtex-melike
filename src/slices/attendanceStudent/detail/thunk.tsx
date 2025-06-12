import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ATTENDANCESTUDENTS } from '../../../helpers/url_helper'
import { AttendanceStudentDetailState } from '../../../types/attendanceStudent/detail'

export const fetchAttendanceStudent = createAsyncThunk<AttendanceStudentDetailState, number>(
    'attendanceStudent/fetchAttendanceStudent',
    async (attendanceStudentId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${ATTENDANCESTUDENTS}/${attendanceStudentId}`)
            return response.data.data as AttendanceStudentDetailState
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Fetch attendance student failed')
        }
    }
)
