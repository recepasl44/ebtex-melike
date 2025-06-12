import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ATTENDANCEDAYS } from '../../../helpers/url_helper'
import { AttendanceDayDetailState } from '../../../types/attendanceDay/detail'

export const fetchAttendanceDay = createAsyncThunk<AttendanceDayDetailState, number>(
    'attendanceDay/fetchAttendanceDay',
    async (attendanceDayId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${ATTENDANCEDAYS}/${attendanceDayId}`)
            return response.data.data as AttendanceDayDetailState
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Fetch attendance day failed')
        }
    }
)
