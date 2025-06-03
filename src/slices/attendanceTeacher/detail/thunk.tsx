import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ATTENDANCETEACHERS } from '../../../helpers/url_helper'
import { AttendanceTeacherDetailState } from '../../../types/attendanceTeacher/detail'

export const fetchAttendanceTeacher = createAsyncThunk<AttendanceTeacherDetailState, number>(
    'attendanceTeacher/fetchAttendanceTeacher',
    async (attendanceTeacherId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${ATTENDANCETEACHERS}/${attendanceTeacherId}`)
            return response.data.data as AttendanceTeacherDetailState
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Fetch attendance teacher failed')
        }
    }
)
