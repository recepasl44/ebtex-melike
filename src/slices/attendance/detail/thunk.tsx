import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ATTENDANCES } from '../../../helpers/url_helper'
import { AttendanceDetailState } from '../../../types/attendance/detail'

export const fetchAttendance = createAsyncThunk<AttendanceDetailState, number>(
    'attendance/fetchAttendance',
    async (attendanceId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${ATTENDANCES}/${attendanceId}`)
            return response.data.data as AttendanceDetailState
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Fetch attendance failed')
        }
    }
)
