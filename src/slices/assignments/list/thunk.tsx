import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ASSIGNMENTS } from '../../../helpers/url_helper'
import { ListAssignmentsResponse, AssignmentListArg } from '../../../types/assignments/list'

export const fetchAssignments = createAsyncThunk<ListAssignmentsResponse, AssignmentListArg>(
    'assignments/fetchAssignments',
    async (queryParams, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams()
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'enabled') {
                    query.append(key, String(value))
                }
            })
            const url = `${ASSIGNMENTS}?${query.toString()}`
            const resp = await axiosInstance.get(url)
            return resp.data as ListAssignmentsResponse
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch assignments failed')
        }
    }
)
