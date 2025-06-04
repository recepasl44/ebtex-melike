import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ATTENDANCETEACHERS } from '../../../helpers/url_helper'
import { AttendanceTeachersDeleteState } from '../../../types/attendanceTeacher/delete'

export const deleteAttendanceTeacher = createAsyncThunk<AttendanceTeachersDeleteState, number>(
    'attendanceTeacher/deleteAttendanceTeacher',
    async (attendanceTeacherId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${ATTENDANCETEACHERS}/${attendanceTeacherId}`)
            return resp.data as AttendanceTeachersDeleteState
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete attendance teacher failed')
        }
    }
)
