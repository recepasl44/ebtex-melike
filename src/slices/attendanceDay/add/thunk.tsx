import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ATTENDANCEDAYS } from '../../../helpers/url_helper'
import { Data } from '../../../types/attendanceDay/list'
import { AttendanceDaysAddPayload } from '../../../types/attendanceDay/add'

export const addAttendanceDay = createAsyncThunk<Data, AttendanceDaysAddPayload>(
    'attendanceDay/addAttendanceDay',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(ATTENDANCEDAYS, payload)
            return resp.data.data as Data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add attendance day failed')
        }
    }
)
