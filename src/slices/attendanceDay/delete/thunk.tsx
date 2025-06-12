import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ATTENDANCEDAYS } from '../../../helpers/url_helper'
import { AttendanceDaysDeleteState } from '../../../types/attendanceDay/delete'

export const deleteAttendanceDay = createAsyncThunk<AttendanceDaysDeleteState, number>(
    'attendanceDay/deleteAttendanceDay',
    async (attendanceDayId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${ATTENDANCEDAYS}/${attendanceDayId}`)
            return resp.data as AttendanceDaysDeleteState
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete attendance day failed')
        }
    }
)
