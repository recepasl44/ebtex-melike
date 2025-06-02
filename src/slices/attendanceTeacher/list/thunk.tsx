import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ATTENDANCETEACHERS } from '../../../helpers/url_helper'
import { ListAttendanceTeachersResponse, AttendanceTeachersListArg } from '../../../types/attendanceTeacher/list'

export const fetchAttendanceTeachers = createAsyncThunk<ListAttendanceTeachersResponse, AttendanceTeachersListArg>(
    'attendanceTeacher/fetchAttendanceTeachers',
    async (queryParams, { rejectWithValue }) => {
        try {
            const queryString = new URLSearchParams()
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'enabled') {
                    queryString.append(key, String(value))
                }
            })
            const url = `${ATTENDANCETEACHERS}?${queryString.toString()}`
            const resp = await axiosInstance.get(url)
            return resp.data as ListAttendanceTeachersResponse
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch attendance teachers failed')
        }
    }
)
