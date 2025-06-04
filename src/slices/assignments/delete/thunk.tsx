import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ASSIGNMENTS } from '../../../helpers/url_helper'
import { AssignmentsDeleteState } from '../../../types/assignments/delete'

export const deleteAssignment = createAsyncThunk<AssignmentsDeleteState, number>(
    'assignments/deleteAssignment',
    async (assignmentId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${ASSIGNMENTS}/${assignmentId}`)
            return resp.data as AssignmentsDeleteState
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete assignment failed')
        }
    }
)
