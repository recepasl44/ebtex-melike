import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ASSIGNMENTS } from '../../../helpers/url_helper'
import { AssignmentData } from '../../../types/assignments/list'

export const fetchAssignment = createAsyncThunk<AssignmentData, number>(
    'assignments/fetchAssignment',
    async (assignmentId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.get(`${ASSIGNMENTS}/${assignmentId}`)
            return resp.data.data as AssignmentData
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch assignment failed')
        }
    }
)
