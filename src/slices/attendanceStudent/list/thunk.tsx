import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ATTENDANCESTUDENTS } from '../../../helpers/url_helper'
import { ListAttendanceStudentsResponse, AttendanceStudentsListArg } from '../../../types/attendanceStudent/list'

export const fetchAttendanceStudents = createAsyncThunk<ListAttendanceStudentsResponse, AttendanceStudentsListArg>(
    'attendanceStudent/fetchAttendanceStudents',
    async (queryParams, { rejectWithValue }) => {
        try {
            const queryString = new URLSearchParams()
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'enabled') {
                    queryString.append(key, String(value))
                }
            })
            const url = `${ATTENDANCESTUDENTS}?${queryString.toString()}`
            const resp = await axiosInstance.get(url)
            return resp.data as ListAttendanceStudentsResponse
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch attendance students failed')
        }
    }
)
