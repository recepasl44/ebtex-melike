import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ATTENDANCEDAYS } from '../../../helpers/url_helper'
import { Data } from '../../../types/attendanceDay/list'
import { AttendanceDaysUpdatePayload } from '../../../types/attendanceDay/update'

export const updateAttendanceDay = createAsyncThunk<Data, AttendanceDaysUpdatePayload>(
    'attendanceDay/updateAttendanceDay',
    async ({ attendanceDayId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${ATTENDANCEDAYS}/${attendanceDayId}`, payload)
            return resp.data.data as Data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update attendance day failed')
        }
    }
)
