import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ATTENDANCETEACHERS } from '../../../helpers/url_helper'
import { Data } from '../../../types/attendanceTeacher/list'
import { AttendanceTeachersUpdatePayload } from '../../../types/attendanceTeacher/update'

export const updateAttendanceTeacher = createAsyncThunk<Data, AttendanceTeachersUpdatePayload>(
    'attendanceTeacher/updateAttendanceTeacher',
    async ({ attendanceTeacherId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${ATTENDANCETEACHERS}/${attendanceTeacherId}`, payload)
            return resp.data.data as Data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update attendance teacher failed')
        }
    }
)
