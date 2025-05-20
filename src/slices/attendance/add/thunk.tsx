import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ATTENDANCES } from '../../../helpers/url_helper'
import { AttendancesAddPayload } from '../../../types/attendance/add'
import { data } from '../../../types/attendance/list'

export const addAttendance = createAsyncThunk<data, AttendancesAddPayload>(
    'attendance/addAttendance',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(ATTENDANCES, payload)
            return resp.data.data as data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add attendance failed')
        }
    }
)
