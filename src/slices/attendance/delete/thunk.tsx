import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ATTENDANCES } from '../../../helpers/url_helper'
import { AttendancesDeleteState } from '../../../types/attendance/delete'

export const deleteAttendance = createAsyncThunk<AttendancesDeleteState, number>(
    'attendance/deleteAttendance',
    async (attendanceId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${ATTENDANCES}/${attendanceId}`)
            return resp.data as AttendancesDeleteState
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete attendance failed')
        }
    }
)
