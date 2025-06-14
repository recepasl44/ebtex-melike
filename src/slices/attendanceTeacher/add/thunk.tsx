import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ATTENDANCETEACHERS } from '../../../helpers/url_helper'
import { Data } from '../../../types/attendanceTeacher/list'
import { AttendanceTeachersAddPayload } from '../../../types/attendanceTeacher/add'

export const addAttendanceTeacher = createAsyncThunk<Data, AttendanceTeachersAddPayload>(
    'attendanceTeacher/addAttendanceTeacher',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(ATTENDANCETEACHERS, payload)
            return resp.data.data as Data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add attendance teacher failed')
        }
    }
)
