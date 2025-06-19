import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ASSIGNMENTS } from '../../../helpers/url_helper'
import { AssignmentsAddPayload } from '../../../types/assignments/add'
import { AssignmentData } from '../../../types/assignments/list'

export const addAssignment = createAsyncThunk<AssignmentData, AssignmentsAddPayload>(
    'assignments/addAssignment',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(ASSIGNMENTS, payload)
            return resp.data.data as AssignmentData
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add assignment failed')
        }
    }
)
