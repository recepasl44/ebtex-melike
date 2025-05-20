import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ASSIGNMENTS } from '../../../helpers/url_helper'
import { AssignmentsUpdatePayload } from '../../../types/assignments/update'
import { AssignmentData } from '../../../types/assignments/list'

export const updateAssignment = createAsyncThunk<AssignmentData, AssignmentsUpdatePayload>(
    'assignments/updateAssignment',
    async ({ assignmentId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${ASSIGNMENTS}/${assignmentId}`, payload)
            return resp.data.data as AssignmentData
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update assignment failed')
        }
    }
)
