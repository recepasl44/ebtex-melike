import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ATTENDANCESTUDENTS } from '../../../helpers/url_helper'
import { Data } from '../../../types/attendanceStudent/list'
import { AttendanceStudentsAddPayload } from '../../../types/attendanceStudent/add'

export const addAttendanceStudent = createAsyncThunk<Data, AttendanceStudentsAddPayload>(
    'attendanceStudent/addAttendanceStudent',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(ATTENDANCESTUDENTS, payload)
            return resp.data.data as Data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add attendance student failed')
        }
    }
)
