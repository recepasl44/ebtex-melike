import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { AttendancesUpdatePayload } from '../../../types/attendance/update'
import { AttendanceData } from '../../../types/attendance/list'
import { ATTENDANCES } from '../../../helpers/url_helper'

export const updateAttendance = createAsyncThunk<AttendanceData, AttendancesUpdatePayload>(
    'attendance/updateAttendance',
    async ({ attendanceId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${ATTENDANCES}/${attendanceId}`, payload)
            return resp.data.data as AttendanceData
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update attendance failed')
        }
    }
)
