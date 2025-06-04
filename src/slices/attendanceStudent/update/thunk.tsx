import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ATTENDANCESTUDENTS } from '../../../helpers/url_helper'
import { Data } from '../../../types/attendanceStudent/list'
import { AttendanceStudentsUpdatePayload } from '../../../types/attendanceStudent/update'

export const updateAttendanceStudent = createAsyncThunk<Data, AttendanceStudentsUpdatePayload>(
    'attendanceStudent/updateAttendanceStudent',
    async ({ attendanceStudentId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${ATTENDANCESTUDENTS}/${attendanceStudentId}`, payload)
            return resp.data.data as Data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update attendance student failed')
        }
    }
)
