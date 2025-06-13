import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ATTENDANCEDAYS } from '../../../helpers/url_helper'
import { ListAttendanceDaysResponse, AttendanceDaysListArg } from '../../../types/attendanceDay/list'

export const fetchAttendanceDays = createAsyncThunk<ListAttendanceDaysResponse, AttendanceDaysListArg>(
    'attendanceDay/fetchAttendanceDays',
    async (queryParams, { rejectWithValue }) => {
        try {
            const queryString = new URLSearchParams()
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'enabled') {
                    queryString.append(key, String(value))
                }
            })
            const url = `${ATTENDANCEDAYS}?${queryString.toString()}`
            const resp = await axiosInstance.get(url)
            return resp.data as ListAttendanceDaysResponse
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch attendance days failed')
        }
    }
)
